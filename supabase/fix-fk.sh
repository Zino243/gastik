#!/bin/bash
# Run this to drop the foreign key constraint

echo "SQL to run in Supabase SQL Editor:"
echo "==================================="
echo ""
echo "-- Drop the foreign key constraint that blocks inserts"
echo 'ALTER TABLE "UserSubscription" DROP CONSTRAINT "UserSubscription_userId_fkey";'
echo ""
echo "-- Optional: Make userId nullable (if you want to allow subs without user)"
echo 'ALTER TABLE "UserSubscription" ALTER COLUMN "userId" DROP NOT NULL;'
echo ""
echo "==================================="
echo "After running this, POST /api/subscription/save should work!"