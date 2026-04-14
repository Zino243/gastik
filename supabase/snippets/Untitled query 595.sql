-- 1. Crear función trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public."User" (id, email, created_at)
    VALUES (
        NEW.id,
        NEW.email,
        NOW()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- 2. Crear trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
-- 3. Habilitar RLS en User
ALTER TABLE public."User" ENABLE ROW LEVEL SECURITY;
-- 4. Policies
CREATE POLICY "Users can view own profile" ON public."User"
    FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public."User"
    FOR UPDATE USING (auth.uid() = id);