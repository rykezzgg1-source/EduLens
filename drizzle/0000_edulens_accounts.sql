CREATE TABLE users (id TEXT PRIMARY KEY, external_id TEXT NOT NULL UNIQUE, email TEXT NOT NULL, name TEXT NOT NULL, institution_id TEXT, profile TEXT NOT NULL DEFAULT '{}', created_at TEXT NOT NULL);
--> statement-breakpoint
CREATE TABLE institutions (id TEXT PRIMARY KEY, name TEXT NOT NULL, type TEXT NOT NULL, config TEXT NOT NULL, owner_id TEXT NOT NULL, created_at TEXT NOT NULL);
--> statement-breakpoint
CREATE TABLE memberships (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, institution_id TEXT NOT NULL, role TEXT NOT NULL, status TEXT NOT NULL, UNIQUE(user_id,institution_id));
--> statement-breakpoint
CREATE TABLE groups_table (id TEXT PRIMARY KEY, institution_id TEXT NOT NULL, name TEXT NOT NULL, level INTEGER NOT NULL, UNIQUE(institution_id,name));
--> statement-breakpoint
CREATE TABLE enrollments (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, group_id TEXT NOT NULL, status TEXT NOT NULL, created_at TEXT NOT NULL, UNIQUE(user_id,group_id));
--> statement-breakpoint
CREATE TABLE assignments (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, group_id TEXT NOT NULL, subject TEXT NOT NULL, UNIQUE(user_id,group_id,subject));
--> statement-breakpoint
CREATE TABLE applications (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, institution_id TEXT NOT NULL, data TEXT NOT NULL, status TEXT NOT NULL, created_at TEXT NOT NULL);
--> statement-breakpoint
CREATE TABLE invitations (id TEXT PRIMARY KEY, token_hash TEXT NOT NULL UNIQUE, institution_id TEXT NOT NULL, issuer_id TEXT NOT NULL, role TEXT NOT NULL, email TEXT, data TEXT NOT NULL, uses INTEGER NOT NULL DEFAULT 0, max_uses INTEGER NOT NULL, expires_at TEXT NOT NULL);
--> statement-breakpoint
CREATE TABLE sessions (id TEXT PRIMARY KEY, token_hash TEXT NOT NULL UNIQUE, user_id TEXT NOT NULL, created_at TEXT NOT NULL, last_seen TEXT NOT NULL, expires_at TEXT NOT NULL, user_agent TEXT NOT NULL, revoked INTEGER NOT NULL DEFAULT 0);
--> statement-breakpoint
CREATE TABLE records (id TEXT PRIMARY KEY, institution_id TEXT NOT NULL, kind TEXT NOT NULL, group_id TEXT, subject TEXT, owner_id TEXT NOT NULL, target_id TEXT, data TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, deleted INTEGER NOT NULL DEFAULT 0);
--> statement-breakpoint
CREATE INDEX records_scope ON records(institution_id,kind,group_id,created_at);
--> statement-breakpoint
CREATE INDEX records_target ON records(target_id,kind,created_at);
--> statement-breakpoint
CREATE TABLE grade_history (id TEXT PRIMARY KEY, grade_id TEXT NOT NULL, actor_id TEXT NOT NULL, before_data TEXT, after_data TEXT, created_at TEXT NOT NULL);
--> statement-breakpoint
CREATE TABLE uploads (id TEXT PRIMARY KEY, institution_id TEXT NOT NULL, owner_id TEXT NOT NULL, record_id TEXT, filename TEXT NOT NULL, mime TEXT NOT NULL, size INTEGER NOT NULL, object_key TEXT NOT NULL);
--> statement-breakpoint
CREATE TABLE read_receipts (user_id TEXT NOT NULL, scope_id TEXT NOT NULL, read_at TEXT NOT NULL, PRIMARY KEY(user_id,scope_id));
--> statement-breakpoint
CREATE TABLE poll_voters (poll_id TEXT NOT NULL, voter_hash TEXT NOT NULL, PRIMARY KEY(poll_id,voter_hash));
--> statement-breakpoint
CREATE TABLE poll_results (poll_id TEXT NOT NULL, option_id TEXT NOT NULL, total INTEGER NOT NULL DEFAULT 0, PRIMARY KEY(poll_id,option_id));
