# Supabase SQL Schema for Blog


Run the following SQL in your Supabase SQL Editor to set up the necessary tables for the blog's social features.
## NOTE: Do this once for every new database deployment

```sql
-- Create table for likes
CREATE TABLE blog_likes (
  slug TEXT PRIMARY KEY,
  count INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for comments
CREATE TABLE blog_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES blog_comments(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Optional but recommended)
ALTER TABLE blog_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since the user chose anonymous)
CREATE POLICY "Public Read Likes" ON blog_likes FOR SELECT USING (true);
CREATE POLICY "Public Update Likes" ON blog_likes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Upsert Likes" ON blog_likes FOR UPDATE USING (true);

CREATE POLICY "Public Read Comments" ON blog_comments FOR SELECT USING (true);
CREATE POLICY "Public Insert Comments" ON blog_comments FOR INSERT WITH CHECK (true);
```

### Environment Variables
Make sure to add these to your `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
