-- EventTask.tasksLines: TEXT[] -> JSONB (string[][])
-- Старые HTML-строки нужно заново записать в формате токенов

ALTER TABLE "EventTask" ALTER COLUMN "tasksLines" DROP DEFAULT;

ALTER TABLE "EventTask"
ALTER COLUMN "tasksLines" TYPE JSONB
USING '[]'::jsonb;

ALTER TABLE "EventTask" ALTER COLUMN "tasksLines" SET DEFAULT '[]'::jsonb;
