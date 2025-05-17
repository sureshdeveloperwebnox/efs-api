CREATE OR REPLACE PROCEDURE update_work_order_procedure(
    p_id BIGINT,  -- Added this missing parameter
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
    RAISE NOTICE 'Starting update_work_order procedure with parameters:';
    RAISE NOTICE 'Organization ID: %, Customer ID: %, Company ID: %', p_organization_id, p_customer_id, p_company_id;
    RAISE NOTICE 'Asset ID: %, Maintenance Plan ID: %', p_asset_id, p_maintenance_plan_id;
    RAISE NOTICE 'Title: %, Priority: %, Status: %', p_title, p_priority, p_status;
    
    -- Start transaction
    BEGIN
        RAISE NOTICE 'Updating work_orders table...';
        
        UPDATE work_orders
        SET
            organization_id = p_organization_id,
            customer_id = p_customer_id,
            company_id = p_company_id,
            asset_id = NULLIF(p_asset_id, 0),
            maintenance_plan_id = NULLIF(p_maintenance_plan_id, 0),
            title = p_title,
            description = p_description,
            priority = p_priority::"Priority",
            status = p_status::"WorkOrderStatus",
            assigned_to = NULLIF(p_assigned_to, 0),
            assigned_crew_id = NULLIF(p_assigned_crew_id, 0),
            scheduled_start_date = p_scheduled_start_date,
            scheduled_end_date = p_scheduled_end_date,
            actual_start_date = p_actual_start_date,
            actual_end_date = p_actual_end_date,
            currency_id = NULLIF(p_currency_id, 0),
            estimated_cost = p_estimated_cost,
            actual_cost = p_actual_cost,
            address = p_address,
            city = p_city,
            state = p_state,
            postal_code = p_postal_code,
            country = p_country,
            is_multi_day = NULLIF(p_is_multi_day, 0),
            updated_at = p_date_time
        WHERE id = p_id
        RETURNING id INTO p_work_order_id;

        RAISE NOTICE 'Work order updated successfully with ID: %', p_work_order_id;

        -- Delete all work_order_services against work order_id
        DELETE FROM work_order_services
        WHERE work_order_id = p_id;

        -- Update work_order_services
        IF p_services IS NOT NULL THEN
            RAISE NOTICE 'Processing % services...', jsonb_array_length(p_services);
            FOR v_service IN SELECT * FROM jsonb_to_recordset(p_services) AS x(
                service_id BIGINT,
                quantity INTEGER,
                service_cost NUMERIC(10,2)
            )
            LOOP
                RAISE NOTICE 'Adding service ID: %, Quantity: %, Cost: %', 
                    v_service.service_id, v_service.quantity, v_service.service_cost;
                    
                INSERT INTO work_order_services (
                    work_order_id,
                    service_id,
                    quantity,
                    service_cost,
					updated_at
                ) VALUES (
                    p_id,  -- Changed from p_work_order_id to p_id
                    v_service.service_id,
                    v_service.quantity,
                    v_service.service_cost,
					p_date_time
                );
            END LOOP;
            RAISE NOTICE 'Services processing completed';
        ELSE
            RAISE NOTICE 'No services to process';
        END IF;

        -- Delete all work_order_tasks against work order_id
        DELETE FROM work_order_tasks
        WHERE work_order_id = p_id;

        -- Update work_order_tasks
        IF p_tasks IS NOT NULL THEN
            RAISE NOTICE 'Processing % tasks...', jsonb_array_length(p_tasks);
            FOR v_task IN SELECT * FROM jsonb_to_recordset(p_tasks) AS x(
                task_name VARCHAR(255),
                task_description TEXT,
                assigned_to BIGINT,
                status TEXT,
                due_date TEXT
            )
            LOOP
                RAISE NOTICE 'Adding task: % (Assigned to: %, Status: %)', 
                    v_task.task_name, v_task.assigned_to, v_task.status;
                    
                INSERT INTO work_order_tasks (
                    work_order_id,
                    task_name,
                    task_description,
                    assigned_to,
                    status,
                    due_date,
					updated_at
                ) VALUES (
                    p_id,  -- Changed from p_work_order_id to p_id
                    v_task.task_name,
                    v_task.task_description,
                    v_task.assigned_to,
                    v_task.status::"WorkOrderTaskStatus",
                    v_task.due_date,
					p_date_time
                );
            END LOOP;
            RAISE NOTICE 'Tasks processing completed';
        ELSE
            RAISE NOTICE 'No tasks to process';
        END IF;

        -- Delete all work_order_assets against work order_id
        DELETE FROM work_order_assets
        WHERE work_order_id = p_id;
        
        -- Update work_order_assets
        IF p_assets IS NOT NULL THEN
            RAISE NOTICE 'Processing % assets...', jsonb_array_length(p_assets);
            FOR v_asset IN SELECT * FROM jsonb_to_recordset(p_assets) AS x(
                asset_id BIGINT,
                quantity INTEGER
            )
            LOOP
                RAISE NOTICE 'Adding asset ID: %, Quantity: %', 
                    v_asset.asset_id, v_asset.quantity;
                    
                INSERT INTO work_order_assets (
                    work_order_id,
                    asset_id,
                    quantity,
					updated_at
                ) VALUES (
                    p_id,  -- Changed from p_work_order_id to p_id
                    v_asset.asset_id,
                    v_asset.quantity,
					p_date_time
                );
            END LOOP;
            RAISE NOTICE 'Assets processing completed';
        ELSE
            RAISE NOTICE 'No assets to process';
        END IF;

    EXCEPTION
        WHEN OTHERS THEN
            -- Rollback any changes if error occurs
            RAISE EXCEPTION 'Error updating work order: %', SQLERRM;
    END;
    
    RAISE NOTICE 'Work order update completed successfully. Work Order ID: %', p_work_order_id;
END;
$$;