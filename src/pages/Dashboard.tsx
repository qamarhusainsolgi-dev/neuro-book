import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Download, User, Shield, Loader2 } from "lucide-react";

interface Purchase {
  id: string;
  amount_paid: number;
  created_at: string;
  ebook_id: string;
  ebooks: { title: string; author: string; cover_url: string; category: string } | null;
}

interface DownloadRecord {
  id: string;
  downloaded_at: string;
  ebook_id: string;
  ebooks: { title: string; author: string } | null;
}

interface Profile {
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
}

export default function Dashboard() {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [downloads, setDownloads] = useState<DownloadRecord[]>([]);
  const [profile, setProfile] = useState<Profile>({ display_name: "", avatar_url: "", bio: "" });
  const [saving, setSaving] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [purchasesRes, downloadsRes, profileRes] = await Promise.all([
        supabase.from("purchases").select("id, amount_paid, created_at, ebook_id, ebooks(title, author, cover_url, category)").eq("user_id", user.id).order("created_at", { ascending: false }),
        supabase.from("downloads").select("id, downloaded_at, ebook_id, ebooks(title, author)").eq("user_id", user.id).order("downloaded_at", { ascending: false }).limit(20),
        supabase.from("profiles").select("display_name, avatar_url, bio").eq("user_id", user.id).single(),
      ]);
      if (purchasesRes.data) setPurchases(purchasesRes.data as any);
      if (downloadsRes.data) setDownloads(downloadsRes.data as any);
      if (profileRes.data) setProfile(profileRes.data as any);
      setDataLoading(false);
    };
    load();
  }, [user]);

  const saveProfile = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({
      display_name: profile.display_name,
      bio: profile.bio,
    }).eq("user_id", user.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile updated!" });
    }
    setSaving(false);
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
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-display font-bold">My Dashboard</h1>
                <p className="text-muted-foreground mt-1">Welcome back, {profile.display_name || user?.email}</p>
              </div>
              {isAdmin && (
                <Button variant="hero-outline" size="sm" asChild>
                  <Link to="/admin">Admin Panel</Link>
                </Button>
              )}
            </div>

            <Tabs defaultValue="library" className="space-y-6">
              <TabsList className="glass w-full flex-wrap h-auto gap-1 p-1">
                <TabsTrigger value="library" className="gap-1.5 text-xs sm:text-sm flex-1 min-w-0"><BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" /><span className="truncate">My Library</span></TabsTrigger>
                <TabsTrigger value="downloads" className="gap-1.5 text-xs sm:text-sm flex-1 min-w-0"><Download className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" /><span className="truncate">Downloads</span></TabsTrigger>
                <TabsTrigger value="profile" className="gap-1.5 text-xs sm:text-sm flex-1 min-w-0"><User className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" /><span className="truncate">Profile</span></TabsTrigger>
                <TabsTrigger value="security" className="gap-1.5 text-xs sm:text-sm flex-1 min-w-0"><Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" /><span className="truncate">Security</span></TabsTrigger>
              </TabsList>

              <TabsContent value="library">
                {purchases.length === 0 ? (
                  <div className="glass p-12 text-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-display text-lg font-semibold mb-2">No purchases yet</h3>
                    <p className="text-muted-foreground mb-4">Browse our store to find your next great read.</p>
                    <Button variant="hero" asChild><Link to="/store">Browse Store</Link></Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {purchases.map((p) => (
                      <div key={p.id} className="glass p-4 glow-border">
                        {p.ebooks && (
                          <>
                            <img src={p.ebooks.cover_url || ""} alt={p.ebooks.title} className="w-full aspect-[3/4] object-cover rounded-lg mb-3" />
                            <h3 className="font-display font-semibold text-sm line-clamp-2">{p.ebooks.title}</h3>
                            <p className="text-xs text-muted-foreground">{p.ebooks.author}</p>
                            <p className="text-xs text-muted-foreground mt-1">Purchased: {new Date(p.created_at).toLocaleDateString()}</p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="downloads">
                {downloads.length === 0 ? (
                  <div className="glass p-12 text-center">
                    <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No download history yet.</p>
                  </div>
                ) : (
                  <div className="glass overflow-x-auto">
                    <table className="w-full text-sm min-w-[400px]">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-3 sm:p-4 text-muted-foreground font-medium">Title</th>
                          <th className="text-left p-3 sm:p-4 text-muted-foreground font-medium hidden sm:table-cell">Author</th>
                          <th className="text-left p-3 sm:p-4 text-muted-foreground font-medium">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {downloads.map((d) => (
                          <tr key={d.id} className="border-b border-border/50">
                            <td className="p-3 sm:p-4">{d.ebooks?.title || "Unknown"}</td>
                            <td className="p-3 sm:p-4 text-muted-foreground hidden sm:table-cell">{d.ebooks?.author || "—"}</td>
                            <td className="p-3 sm:p-4 text-muted-foreground">{new Date(d.downloaded_at).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="profile">
                <div className="glass glow-border p-4 sm:p-6 max-w-lg space-y-4">
                  <div className="space-y-2">
                    <Label>Display Name</Label>
                    <Input value={profile.display_name || ""} onChange={(e) => setProfile({ ...profile, display_name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <textarea
                      value={profile.bio || ""}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[100px]"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={user?.email || ""} disabled className="opacity-60" />
                  </div>
                  <Button variant="hero" onClick={saveProfile} disabled={saving}>
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="security">
                <div className="glass glow-border p-4 sm:p-6 max-w-lg space-y-4">
                  <h3 className="font-display font-semibold">Change Password</h3>
                  <p className="text-sm text-muted-foreground">
                    To change your password, use the password reset flow. We'll send a link to your email.
                  </p>
                  <Button
                    variant="hero-outline"
                    onClick={async () => {
                      if (!user?.email) return;
                      await supabase.auth.resetPasswordForEmail(user.email, {
                        redirectTo: `${window.location.origin}/reset-password`,
                      });
                      toast({ title: "Reset link sent!", description: "Check your email." });
                    }}
                  >
                    Send Password Reset Email
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
