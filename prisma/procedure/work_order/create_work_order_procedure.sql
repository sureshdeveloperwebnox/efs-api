CREATE OR REPLACE PROCEDURE create_work_order_procedure(
    p_organization_id BIGINT,
    p_customer_id BIGINT,
    p_company_id BIGINT,
    p_asset_id BIGINT,
    p_maintenance_plan_id BIGINT,
    p_title TEXT,
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
    p_address TEXT,
    p_city TEXT,
    p_state TEXT,
    p_postal_code TEXT,
    p_country TEXT,
    p_is_multi_day INTEGER,
    p_date_time TEXT,
    p_services JSONB DEFAULT NULL,
    p_tasks JSONB DEFAULT NULL,
    p_assets JSONB DEFAULT NULL,
    INOUT p_work_order_id BIGINT DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_service RECORD;
    v_task RECORD;
    v_asset RECORD;
BEGIN
    -- Start transaction
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
            NULLIF(p_asset_id, 0),
            NULLIF(p_maintenance_plan_id, 0),
            p_title,
            p_description,
            p_priority::"Priority",
            p_status::"WorkOrderStatus",
            NULLIF(p_assigned_to, 0),
            NULLIF(p_assigned_crew_id, 0),
            p_scheduled_start_date,
            p_scheduled_end_date,
            p_actual_start_date,
            p_actual_end_date,
            NULLIF(p_currency_id, 0),
            p_estimated_cost,
            p_actual_cost,
            p_address,
            p_city,
            p_state,
            p_postal_code,
            p_country,
            NULLIF(p_is_multi_day, 0),
            p_date_time
        ) RETURNING id INTO p_work_order_id;

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
                    service_cost,
					created_at
                ) VALUES (
                    p_work_order_id,
                    v_service.service_id,
                    v_service.quantity,
                    v_service.service_cost,
					p_date_time
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
                    due_date,
					created_at
                ) VALUES (
                    p_work_order_id,
                    v_task.task_name,
                    v_task.task_description,
                    v_task.assigned_to,
                    v_task.status::"WorkOrderTaskStatus",
                    v_task.due_date,
					p_date_time
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
                    quantity,
					created_at
                ) VALUES (
                    p_work_order_id,
                    v_asset.asset_id,
                    v_asset.quantity,
					p_date_time
                );
            END LOOP;
        END IF;

    EXCEPTION
        WHEN OTHERS THEN
            -- Rollback any changes if error occurs
            RAISE EXCEPTION 'Error creating work order: %', SQLERRM;
    END;
    
    -- If we get here, everything was successful
    -- p_work_order_id is already set by the RETURNING clause
END;
$$;