CREATE OR REPLACE PROCEDURE create_holiday_proc(
  p_organization_id INT,
  p_name TEXT,
  p_holiday_date TEXT,
  p_is_recurring INT,
  p_created_at TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO holidays (organization_id, name, holiday_date, created_at)
  VALUES (p_organization_id, p_name, p_holiday_date, p_created_at);
END;
$$;