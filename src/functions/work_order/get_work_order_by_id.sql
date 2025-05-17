CREATE OR REPLACE FUNCTION get_work_order_by_id(p_id INTEGER)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT 
        row_to_json(t)
    INTO result
    FROM (
SELECT 
    wo.*,

    -- Organization as full JSON object
    COALESCE(
        (SELECT row_to_json(org) 
         FROM organizations org 
         WHERE org.id = wo.organization_id),
        '{}'::json
    ) AS organization,

    -- Customer as full JSON object
    COALESCE(
        (SELECT row_to_json(cus) 
         FROM customers cus 
         WHERE cus.id = wo.customer_id),
        '{}'::json
    ) AS customer,

    -- Services with full columns from work_order_services and joined services
    COALESCE(
        (
            SELECT json_agg(row_to_json(svc_data))
            FROM (
                SELECT wos.*, sv.*
                FROM work_order_services wos
                LEFT JOIN services sv ON sv.id = wos.service_id
                WHERE wos.work_order_id = wo.id
            ) svc_data
        ),
        '[]'::json
    ) AS services,

    -- Tasks (just from work_order_tasks)
    COALESCE(
        (
            SELECT json_agg(row_to_json(wot)) 
            FROM work_order_tasks wot 
            WHERE wot.work_order_id = wo.id
        ),
        '[]'::json
    ) AS tasks,

    -- Assets with full columns from work_order_assets and joined assets
    COALESCE(
        (
            SELECT json_agg(row_to_json(ast_data))
            FROM (
                SELECT woa.*, ast.*
                FROM work_order_assets woa
                LEFT JOIN assets ast ON ast.id = woa.asset_id
                WHERE woa.work_order_id = wo.id
            ) ast_data
        ),
        '[]'::json
    ) AS assets

FROM work_orders wo
WHERE wo.id = p_id
    ) t;

    RETURN result;
END;
$$ LANGUAGE plpgsql;
