import { AssetStatus } from "./main.model";

// Create Asset Model
export interface ICreateAsset {
    organization_id: bigint;
    customer_id: bigint; 
    asset_name: string;
    serial_number: string;
    model: string;
    manufacturer: string;  
    status: AssetStatus;
    location: string;
    notes: string;
    purchase_date: string;
    warranty_expiry: string;
    date_time: string; 
}

export class CreateAsset implements ICreateAsset {
    organization_id: bigint;
    customer_id: bigint; 
    asset_name: string;
    serial_number: string;
    model: string;
    manufacturer: string;  
    status: AssetStatus;
    location: string;
    notes: string;
    purchase_date: string;
    warranty_expiry: string;
    date_time: string; 

    constructor (data: ICreateAsset) {
        this.organization_id = data.organization_id;
        this.customer_id = data.customer_id;
        this.asset_name = data.asset_name;
        this.serial_number = data.serial_number;
        this.model = data.model;
        this.manufacturer = data.manufacturer;
        this.status = data.status;
        this.location = data.location;
        this.notes = data.notes;
        this.purchase_date = data.purchase_date;
        this.warranty_expiry = data.warranty_expiry;
        this.date_time = data.date_time;
    }
}


// Update Asset Model
export interface IUpdateAsset {
    id: bigint;
    organization_id: bigint;
    customer_id: bigint; 
    asset_name: string;
    serial_number: string;
    model: string;
    manufacturer: string;  
    status: AssetStatus;
    location: string;
    notes: string;
    purchase_date: string;
    warranty_expiry: string;
    date_time: string; 
}

export class UpdateAsset implements IUpdateAsset {
    id: bigint;
    organization_id: bigint;
    customer_id: bigint; 
    asset_name: string;
    serial_number: string;
    model: string;
    manufacturer: string;  
    status: AssetStatus;
    location: string;
    notes: string;
    purchase_date: string;
    warranty_expiry: string;
    date_time: string; 

    constructor (data: IUpdateAsset) {
        this.id = data.id;
        this.organization_id = data.organization_id;
        this.customer_id = data.customer_id;
        this.asset_name = data.asset_name;
        this.serial_number = data.serial_number;
        this.model = data.model;
        this.manufacturer = data.manufacturer;
        this.status = data.status;
        this.location = data.location;
        this.notes = data.notes;
        this.purchase_date = data.purchase_date;
        this.warranty_expiry = data.warranty_expiry;
        this.date_time = data.date_time;
    }
}