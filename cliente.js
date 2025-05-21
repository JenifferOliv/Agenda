const SUPABASE_URL ="https://dfjahmtqfdxyvrqpsarn.supabase.co";
const SUPABASE_KEY ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmamFobXRxZmR4eXZycXBzYXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MjI5MDMsImV4cCI6MjA2MzM5ODkwM30.QE5MOts4sc89Dd4YF5LxyhWsay2URTBqFy8GDL6I1MY";
const _supabase = supabase.createClient(SUPABASE_URL,SUPABASE_KEY);
console.log("Supabase client inicializado!");
