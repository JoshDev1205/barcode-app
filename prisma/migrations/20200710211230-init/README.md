# Migration `20200710211230-init`

This migration has been generated by Josh Ospina Tafur at 7/10/2020, 9:12:30 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Unregistered" ADD COLUMN "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200710200901-init..20200710211230-init
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -16,7 +16,8 @@
   barcode String @unique
 }
 model Unregistered {
-  id      Int    @default(autoincrement()) @id
-  barcode String @unique
+  id        Int      @default(autoincrement()) @id
+  barcode   String   @unique
+  createdAt DateTime @default(now())
 }
```


