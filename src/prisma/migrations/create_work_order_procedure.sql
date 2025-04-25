CREATE OR REPLACE PROCEDURE create_work_order(
    p_organization_id BIGINT,
    p_customer_id BIGINT,
    p_company_id BIGINT,
    p_asset_id BIGINT,
    p_maintenance_plan_id BIGINT,
    p_title VARCHAR(255),
    p_description TEXT,
    p_priority VARCHAR(50),
    p_status VARCHAR(50),
    p_assigned_to BIGINT,
    p_assigned_crew_id BIGINT,
    p_scheduled_start_date TEXT,
    p_scheduled_end_date TEXT,
    p_actual_start_date TEXT,
    p_actual_end_date TEXT,
    p_currency_id BIGINT,
    p_estimated_cost DECIMAL(10,2),
    p_actual_cost DECIMAL(10,2),
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
    -- Insert work order
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
        p_scheduled_start_date,
        p_scheduled_end_date,
        p_actual_start_date,
        p_actual_end_date,
        p_currency_id,
        p_estimated_cost,
        p_actual_cost,
        p_address,
        p_city,
        p_state,
        p_postal_code,
        p_country,
        p_is_multi_day,
        p_date_time
    ) RETURNING id INTO v_work_order_id;

    -- Insert services if provided
    IF p_services IS NOT NULL THEN
        FOR v_service IN SELECT * FROM jsonb_to_recordset(p_services) AS x(
            service_id BIGINT,
            quantity INTEGER,
            service_cost DECIMAL(10,2)
        )
        LOOP
            INSERT INTO work_order_services (
                work_order_id,
                service_id,
                quantity,
                service_cost,
                created_at
            ) VALUES (
                v_work_order_id,
                v_service.service_id,
                v_service.quantity,
                v_service.service_cost,
                p_date_time
            );
        END LOOP;
    END IF;

    -- Insert tasks if provided
    IF p_tasks IS NOT NULL THEN
        FOR v_task IN SELECT * FROM jsonb_to_recordset(p_tasks) AS x(
            task_name VARCHAR(255),
            task_description TEXT,
            assigned_to BIGINT,
            status VARCHAR(50),
            due_date DATE
        )
        LOOP
            INSERT INTO work_order_tasks (
                work_order_id,
                task_name,
                task_description,
                assigned_to,
                status,
                due_date,
                created_at
            ) VALUES (
                v_work_order_id,
                v_task.task_name,
                v_task.task_description,
                v_task.assigned_to,
                v_task.status,
                v_task.due_date,
                p_date_time
            );
        END LOOP;
    END IF;

    -- Insert assets if provided
    IF p_assets IS NOT NULL THEN
        FOR v_asset IN SELECT * FROM jsonb_to_recordset(p_assets) AS x(
            asset_id BIGINT,
            quantity INTEGER
        )
        LOOP
            INSERT INTO work_order_assets (
                work_order_id,
                asset_id,
                quantity,
                created_at
            ) VALUES (
                v_work_order_id,
                v_asset.asset_id,
                v_asset.quantity,
                p_date_time
            );
        END LOOP;
    END IF;
END;
$$;