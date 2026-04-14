-- Row Level Security (RLS) Policies for Gastik App

-- Enable RLS on UserSubscription
ALTER TABLE "UserSubscription" ENABLE ROW LEVEL SECURITY;

-- Users can only see their own subscriptions
CREATE POLICY "Users can view own subscriptions" ON "UserSubscription"
    FOR SELECT
    USING ("userId" = auth.uid());

CREATE POLICY "Users can insert own subscriptions" ON "UserSubscription"
    FOR INSERT
    WITH CHECK ("userId" = auth.uid());

CREATE POLICY "Users can update own subscriptions" ON "UserSubscription"
    FOR UPDATE
    USING ("userId" = auth.uid())
    WITH CHECK ("userId" = auth.uid());

CREATE POLICY "Users can delete own subscriptions" ON "UserSubscription"
    FOR DELETE
    USING ("userId" = auth.uid());

-- Enable RLS on Category
ALTER TABLE "Category" ENABLE ROW LEVEL SECURITY;

-- Users can only see their own categories
CREATE POLICY "Users can view own categories" ON "Category"
    FOR SELECT
    USING ("userId" = auth.uid());

CREATE POLICY "Users can insert own categories" ON "Category"
    FOR INSERT
    WITH CHECK ("userId" = auth.uid());

CREATE POLICY "Users can update own categories" ON "Category"
    FOR UPDATE
    USING ("userId" = auth.uid())
    WITH CHECK ("userId" = auth.uid());

CREATE POLICY "Users can delete own categories" ON "Category"
    FOR DELETE
    USING ("userId" = auth.uid());

-- Enable RLS on UserSettings
ALTER TABLE "UserSettings" ENABLE ROW LEVEL SECURITY;

-- Users can only see their own settings
CREATE POLICY "Users can view own settings" ON "UserSettings"
    FOR SELECT
    USING ("id" = auth.uid());

CREATE POLICY "Users can insert own settings" ON "UserSettings"
    FOR INSERT
    WITH CHECK ("id" = auth.uid());

CREATE POLICY "Users can update own settings" ON "UserSettings"
    FOR UPDATE
    USING ("id" = auth.uid())
    WITH CHECK ("id" = auth.uid());

-- Enable RLS on User table (if used directly)
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON "User"
    FOR SELECT
    USING (id = auth.uid());

CREATE POLICY "Users can update own profile" ON "User"
    FOR UPDATE
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());