import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('blog_likes')
    .select('count')
    .eq('slug', slug)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows found"
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ count: data?.count || 0 });
}

export async function POST(request: Request) {
  const { slug } = await request.json();

  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
  }

  // Increment likes count or create if it doesn't exist
  // We use a rpc for atomicity if possible, or a simple select/upsert
  // Using upsert with increment is safer via RPC or raw SQL but for simple use:
  const { data: currentData } = await supabase
    .from('blog_likes')
    .select('count')
    .eq('slug', slug)
    .single();

  const newCount = (currentData?.count || 0) + 1;

  const { error } = await supabase
    .from('blog_likes')
    .upsert({ slug, count: newCount }, { onConflict: 'slug' });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ count: newCount });
}
