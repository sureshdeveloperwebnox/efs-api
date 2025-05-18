CREATE OR REPLACE FUNCTION get_all_work_order_by_id(p_organization_id BIGINT)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_agg(t)
    INTO result
    FROM (
        SELECT 
            wo.*,
            COALESCE(
                (SELECT json_agg(wos.*) FROM work_order_services wos WHERE wos.work_order_id = wo.id),
                '[]'::json
            ) AS services,
            COALESCE(
                (SELECT json_agg(wot.*) FROM work_order_tasks wot WHERE wot.work_order_id = wo.id),
                '[]'::json
            ) AS tasks,
            COALESCE(
                (SELECT json_agg(woa.*) FROM work_order_assets woa WHERE woa.work_order_id = wo.id),
                '[]'::json
            ) AS assets
        FROM work_orders wo
WHERE wo.organization_id = p_organization_id
    ) t; -- <== You MUST have an alias here, "t" or "_"

    RETURN result;
END;
$$ LANGUAGE plpgsql;
