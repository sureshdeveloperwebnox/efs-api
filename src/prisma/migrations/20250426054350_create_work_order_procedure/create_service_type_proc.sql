CREATE OR REPLACE PROCEDURE create_service_type_proc(
  p_organization_id INT,
  p_name TEXT,
  p_description TEXT,
  p_created_at TIMESTAMP
)
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO service_types (organization_id, name, description, created_at)
  VALUES (p_organization_id, p_name, p_description, p_created_at);
END;
$$;