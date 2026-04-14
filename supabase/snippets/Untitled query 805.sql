INSERT INTO public."User" (id, email, "createdAt", username)
SELECT id, email, created_at, split_part(email, '@', 1)
FROM auth.users
WHERE id NOT IN (SELECT id FROM public."User");