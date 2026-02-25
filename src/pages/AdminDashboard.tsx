import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { BarChart3, BookOpen, Users, DollarSign, Plus, Loader2, Trash2, Edit } from "lucide-react";

interface Ebook {
  id: string;
  title: string;
  author: string;
  price: number;
  original_price: number | null;
  category: string;
  rating: number;
  review_count: number;
  short_description: string | null;
  badge: string | null;
  cover_url: string | null;
  is_published: boolean;
  created_at: string;
}

interface Purchase {
  id: string;
  amount_paid: number;
  created_at: string;
  ebook_id: string;
  user_id: string;
}

export default function AdminDashboard() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "", author: "", price: "", original_price: "", category: "", short_description: "", badge: "", cover_url: "",
  });

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) navigate("/dashboard");
  }, [user, authLoading, isAdmin, navigate]);

  useEffect(() => {
    if (!user || !isAdmin) return;
    const load = async () => {
      const [ebooksRes, purchasesRes] = await Promise.all([
        supabase.from("ebooks").select("*").order("created_at", { ascending: false }),
        supabase.from("purchases").select("*").order("created_at", { ascending: false }),
      ]);
      if (ebooksRes.data) setEbooks(ebooksRes.data as any);
      if (purchasesRes.data) setPurchases(purchasesRes.data as any);
      setDataLoading(false);
    };
    load();
  }, [user, isAdmin]);

  const totalRevenue = purchases.reduce((sum, p) => sum + Number(p.amount_paid), 0);
  const uniqueUsers = new Set(purchases.map((p) => p.user_id)).size;

  const resetForm = () => {
    setForm({ title: "", author: "", price: "", original_price: "", category: "", short_description: "", badge: "", cover_url: "" });
    setEditId(null);
    setShowForm(false);
  };

  const handleSave = async () => {
    if (!form.title || !form.author || !form.price || !form.category) {
      toast({ title: "Missing fields", description: "Title, author, price, and category are required.", variant: "destructive" });
      return;
    }
    const payload = {
      title: form.title,
      author: form.author,
      price: parseFloat(form.price),
      original_price: form.original_price ? parseFloat(form.original_price) : null,
      category: form.category,
      short_description: form.short_description || null,
      badge: form.badge || null,
      cover_url: form.cover_url || null,
    };

    if (editId) {
      const { error } = await supabase.from("ebooks").update(payload).eq("id", editId);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      setEbooks((prev) => prev.map((e) => (e.id === editId ? { ...e, ...payload } : e)));
      toast({ title: "Ebook updated!" });
    } else {
      const { data, error } = await supabase.from("ebooks").insert(payload).select().single();
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      if (data) setEbooks((prev) => [data as any, ...prev]);
      toast({ title: "Ebook created!" });
    }
    resetForm();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("ebooks").delete().eq("id", id);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    setEbooks((prev) => prev.filter((e) => e.id !== id));
    toast({ title: "Ebook deleted" });
  };

  const startEdit = (ebook: Ebook) => {
    setForm({
      title: ebook.title,
      author: ebook.author,
      price: String(ebook.price),
      original_price: ebook.original_price ? String(ebook.original_price) : "",
      category: ebook.category,
      short_description: ebook.short_description || "",
      badge: ebook.badge || "",
      cover_url: ebook.cover_url || "",
    });
    setEditId(ebook.id);
    setShowForm(true);
  };

  if (authLoading || dataLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-display font-bold mb-8">Admin Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { icon: BookOpen, label: "Total Ebooks", value: ebooks.length },
                { icon: DollarSign, label: "Total Revenue", value: `$${totalRevenue.toFixed(2)}` },
                { icon: Users, label: "Unique Buyers", value: uniqueUsers },
                { icon: BarChart3, label: "Total Sales", value: purchases.length },
              ].map((stat) => (
                <div key={stat.label} className="glass glow-border p-5">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="text-xl font-display font-bold">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Tabs defaultValue="ebooks" className="space-y-6">
              <TabsList className="glass">
                <TabsTrigger value="ebooks" className="gap-2"><BookOpen className="h-4 w-4" />Ebooks</TabsTrigger>
                <TabsTrigger value="sales" className="gap-2"><BarChart3 className="h-4 w-4" />Sales</TabsTrigger>
              </TabsList>

              <TabsContent value="ebooks">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-semibold text-lg">Manage Ebooks</h2>
                  <Button variant="hero" size="sm" onClick={() => { resetForm(); setShowForm(true); }}>
                    <Plus className="h-4 w-4 mr-1" /> Add Ebook
                  </Button>
                </div>

                {showForm && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="glass glow-border p-6 mb-6 space-y-4">
                    <h3 className="font-display font-semibold">{editId ? "Edit Ebook" : "New Ebook"}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2"><Label>Title *</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                      <div className="space-y-2"><Label>Author *</Label><Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} /></div>
                      <div className="space-y-2"><Label>Price *</Label><Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} /></div>
                      <div className="space-y-2"><Label>Original Price</Label><Input type="number" step="0.01" value={form.original_price} onChange={(e) => setForm({ ...form, original_price: e.target.value })} /></div>
                      <div className="space-y-2"><Label>Category *</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
                      <div className="space-y-2"><Label>Badge</Label><Input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="e.g. Bestseller, New" /></div>
                      <div className="sm:col-span-2 space-y-2"><Label>Cover URL</Label><Input value={form.cover_url} onChange={(e) => setForm({ ...form, cover_url: e.target.value })} /></div>
                      <div className="sm:col-span-2 space-y-2"><Label>Short Description</Label><Input value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} /></div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="hero" onClick={handleSave}>{editId ? "Update" : "Create"}</Button>
                      <Button variant="ghost" onClick={resetForm}>Cancel</Button>
                    </div>
                  </motion.div>
                )}

                <div className="glass overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 text-muted-foreground font-medium">Title</th>
                        <th className="text-left p-4 text-muted-foreground font-medium hidden sm:table-cell">Category</th>
                        <th className="text-left p-4 text-muted-foreground font-medium">Price</th>
                        <th className="text-right p-4 text-muted-foreground font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ebooks.map((ebook) => (
                        <tr key={ebook.id} className="border-b border-border/50">
                          <td className="p-4 font-medium">{ebook.title}</td>
                          <td className="p-4 text-muted-foreground hidden sm:table-cell">{ebook.category}</td>
                          <td className="p-4">${ebook.price}</td>
                          <td className="p-4 text-right space-x-2">
                            <button onClick={() => startEdit(ebook)} className="text-primary hover:text-primary/80"><Edit className="h-4 w-4 inline" /></button>
                            <button onClick={() => handleDelete(ebook.id)} className="text-destructive hover:text-destructive/80"><Trash2 className="h-4 w-4 inline" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {ebooks.length === 0 && (
                    <div className="p-12 text-center text-muted-foreground">No ebooks yet. Add your first one!</div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="sales">
                <div className="glass overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 text-muted-foreground font-medium">Date</th>
                        <th className="text-left p-4 text-muted-foreground font-medium">Amount</th>
                        <th className="text-left p-4 text-muted-foreground font-medium">User ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {purchases.map((p) => (
                        <tr key={p.id} className="border-b border-border/50">
                          <td className="p-4">{new Date(p.created_at).toLocaleDateString()}</td>
                          <td className="p-4 font-medium">${p.amount_paid}</td>
                          <td className="p-4 text-muted-foreground text-xs">{p.user_id.slice(0, 8)}...</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {purchases.length === 0 && (
                    <div className="p-12 text-center text-muted-foreground">No sales yet.</div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
