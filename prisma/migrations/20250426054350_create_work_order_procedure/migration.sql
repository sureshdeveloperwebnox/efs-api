
CREATE OR REPLACE PROCEDURE create_work_order(
    p_organization_id BIGINT,
    p_customer_id BIGINT,
    p_company_id BIGINT,
    p_asset_id BIGINT,
    p_maintenance_plan_id BIGINT,
    p_title VARCHAR(255),
    p_description TEXT,
    p_priority TEXT,
    p_status TEXT,
    p_assigned_to BIGINT,
    p_assigned_crew_id BIGINT,
    p_scheduled_start_date TEXT,
    p_scheduled_end_date TEXT,
    p_actual_start_date TEXT,
    p_actual_end_date TEXT,
    p_currency_id INTEGER,
    p_estimated_cost NUMERIC(10,2),
    p_actual_cost NUMERIC(10,2),
    p_address VARCHAR(255),
    p_city VARCHAR(100),
    p_state VARCHAR(100),
    p_postal_code VARCHAR(20),
    p_country VARCHAR(100),
    p_is_multi_day INTEGER,
    p_date_time TEXT,
    p_services JSONB DEFAULT NULL,
    p_tasks JSONB DEFAULT NULL,
    p_assets JSONB DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_work_order_id BIGINT;
    v_service RECORD;
    v_task RECORD;
    v_asset RECORD;
BEGIN
    -- Insert into work_orders
    INSERT INTO work_orders (
        organization_id,
        customer_id,
        company_id,
        asset_id,
        maintenance_plan_id,
        title,
        description,
        priority,
        status,
        assigned_to,
        assigned_crew_id,
        scheduled_start_date,
        scheduled_end_date,
        actual_start_date,
        actual_end_date,
        currency_id,
        estimated_cost,
        actual_cost,
        address,
        city,
        state,
        postal_code,
        country,
        is_multi_day,
        created_at
    ) VALUES (
        p_organization_id,
        p_customer_id,
        p_company_id,
        p_asset_id,
        p_maintenance_plan_id,
        p_title,
        p_description,
        p_priority,
        p_status,
        p_assigned_to,
        p_assigned_crew_id,
        p_scheduled_start_date::timestamp,
        p_scheduled_end_date::timestamp,
        CASE WHEN p_actual_start_date IS NOT NULL THEN p_actual_start_date::timestamp ELSE NULL END,
        CASE WHEN p_actual_end_date IS NOT NULL THEN p_actual_end_date::timestamp ELSE NULL END,
        p_currency_id,
        p_estimated_cost,
        p_actual_cost,
        p_address,
        p_city,
        p_state,
        p_postal_code,
        p_country,
        p_is_multi_day,
        p_date_time::timestamp
    ) RETURNING id INTO v_work_order_id;

    -- Insert work_order_services
    IF p_services IS NOT NULL THEN
        FOR v_service IN SELECT * FROM jsonb_to_recordset(p_services) AS x(
            service_id BIGINT,
            quantity INTEGER,
            service_cost NUMERIC(10,2)
        )
        LOOP
            INSERT INTO work_order_services (
                work_order_id,
                service_id,
                quantity,
                service_cost
            ) VALUES (
                v_work_order_id,
                v_service.service_id,
                v_service.quantity,
                v_service.service_cost
            );
        END LOOP;
    END IF;

    -- Insert work_order_tasks
    IF p_tasks IS NOT NULL THEN
        FOR v_task IN SELECT * FROM jsonb_to_recordset(p_tasks) AS x(
            task_name VARCHAR(255),
            task_description TEXT,
            assigned_to BIGINT,
            status TEXT,
            due_date TEXT
        )
        LOOP
            INSERT INTO work_order_tasks (
                work_order_id,
                task_name,
                task_description,
                assigned_to,
                status,
                due_date
            ) VALUES (
                v_work_order_id,
                v_task.task_name,
                v_task.task_description,
                v_task.assigned_to,
                v_task.status,
                v_task.due_date::timestamp
            );
        END LOOP;
    END IF;

    -- Insert work_order_assets
    IF p_assets IS NOT NULL THEN
        FOR v_asset IN SELECT * FROM jsonb_to_recordset(p_assets) AS x(
            asset_id BIGINT,
            quantity INTEGER
        )
        LOOP
            INSERT INTO work_order_assets (
                work_order_id,
                asset_id,
                quantity
            ) VALUES (
                v_work_order_id,
                v_asset.asset_id,
                v_asset.quantity
            );
        END LOOP;
    END IF;

END;
$$;
