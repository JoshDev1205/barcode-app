# Migration `20200710200901-init`

This migration has been generated by Josh Ospina Tafur at 7/10/2020, 8:09:01 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Unregistered" (
"barcode" text  NOT NULL ,
"id" SERIAL,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "Unregistered.barcode" ON "public"."Unregistered"("barcode")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200710191040-init..20200710200901-init
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
@@ -14,4 +14,9 @@
   id      Int    @default(autoincrement()) @id
   title   String
   barcode String @unique
 }
+
+model Unregistered {
+  id      Int    @default(autoincrement()) @id
+  barcode String @unique
+}
```


