-- Eliminar la policy actual
DROP POLICY IF EXISTS "Enable insert for users based on user_id" ON "Service";
-- Crear nueva policy limpia
CREATE POLICY "Users can insert own services" ON "Service"
    FOR INSERT TO authenticated
    WITH CHECK ("userId" = auth.uid());