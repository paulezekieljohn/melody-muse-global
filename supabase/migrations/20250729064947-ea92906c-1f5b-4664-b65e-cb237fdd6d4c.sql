-- Add policy to allow anyone to delete songs (for admin functionality)
CREATE POLICY "Anyone can delete songs" 
ON public.songs 
FOR DELETE 
USING (true);