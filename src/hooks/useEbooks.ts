import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Local cover fallbacks keyed by title fragment
import cover1 from "@/assets/covers/cover-1.jpg";
import cover2 from "@/assets/covers/cover-2.jpg";
import cover3 from "@/assets/covers/cover-3.jpg";
import cover4 from "@/assets/covers/cover-4.jpg";
import cover5 from "@/assets/covers/cover-5.jpg";
import cover6 from "@/assets/covers/cover-6.jpg";
import cover7 from "@/assets/covers/cover-7.jpg";
import cover8 from "@/assets/covers/cover-8.jpg";

const coverFallbacks: Record<string, string> = {
  "cover-1": cover1,
  "cover-2": cover2,
  "cover-3": cover3,
  "cover-4": cover4,
  "cover-5": cover5,
  "cover-6": cover6,
  "cover-7": cover7,
  "cover-8": cover8,
};

function resolveCoverUrl(url: string | null): string {
  if (!url) return cover1;
  // If it's a local path like /covers/cover-1.jpg, map to imported asset
  const match = url.match(/cover-(\d+)/);
  if (match) {
    const key = `cover-${match[1]}`;
    return coverFallbacks[key] || cover1;
  }
  // If it starts with http, it's already a full URL
  if (url.startsWith("http")) return url;
  return cover1;
}

export interface Ebook {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice: number | null;
  coverUrl: string;
  category: string;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  longDescription: string | null;
  badge: string | null;
  pdfUrl: string | null;
  isPublished: boolean;
}

export function useEbooks() {
  return useQuery({
    queryKey: ["ebooks"],
    queryFn: async (): Promise<Ebook[]> => {
      const { data, error } = await supabase
        .from("ebooks")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (data || []).map((e) => ({
        id: e.id,
        title: e.title,
        author: e.author,
        price: Number(e.price),
        originalPrice: e.original_price ? Number(e.original_price) : null,
        coverUrl: resolveCoverUrl(e.cover_url),
        category: e.category,
        rating: Number(e.rating),
        reviewCount: e.review_count,
        shortDescription: e.short_description || "",
        longDescription: e.long_description,
        badge: e.badge,
        pdfUrl: e.pdf_url,
        isPublished: e.is_published,
      }));
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useEbook(id: string | undefined) {
  return useQuery({
    queryKey: ["ebook", id],
    queryFn: async (): Promise<Ebook | null> => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("ebooks")
        .select("*")
        .eq("id", id)
        .single();

      if (error) return null;

      return {
        id: data.id,
        title: data.title,
        author: data.author,
        price: Number(data.price),
        originalPrice: data.original_price ? Number(data.original_price) : null,
        coverUrl: resolveCoverUrl(data.cover_url),
        category: data.category,
        rating: Number(data.rating),
        reviewCount: data.review_count,
        shortDescription: data.short_description || "",
        longDescription: data.long_description,
        badge: data.badge,
        pdfUrl: data.pdf_url,
        isPublished: data.is_published,
      };
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["ebook-categories"],
    queryFn: async (): Promise<string[]> => {
      const { data, error } = await supabase
        .from("ebooks")
        .select("category")
        .eq("is_published", true);

      if (error) throw error;
      const cats = [...new Set((data || []).map((e) => e.category))].sort();
      return ["All", ...cats];
    },
    staleTime: 10 * 60 * 1000,
  });
}
