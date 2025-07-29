-- Create a table for songs
CREATE TABLE public.songs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  language TEXT NOT NULL,
  genre TEXT,
  key TEXT,
  tempo INTEGER,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  collections TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  lyrics TEXT,
  chords TEXT,
  language_versions JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security (make songs publicly readable for now)
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read songs (public songbook)
CREATE POLICY "Songs are publicly readable" 
ON public.songs 
FOR SELECT 
USING (true);

-- Create policy to allow anyone to insert songs (for admin functionality)
CREATE POLICY "Anyone can insert songs" 
ON public.songs 
FOR INSERT 
WITH CHECK (true);

-- Create trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_songs_updated_at
BEFORE UPDATE ON public.songs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();