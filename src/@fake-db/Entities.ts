import calculatePagination, { Pagination } from "./utils/calculatePagination";

class Entities<T extends { id: string }> {
    rawData;

    constructor(_data: T[]) {
        this.rawData = _data;
    }

    create(values: T): Promise<string> {
        return new Promise((resolve) => {
            this.rawData.push(values);
            resolve(values.id);
        });
    }

    update(id: string, values: Partial<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            const entityToUpdate = this.rawData.find((ent) => ent.id === id);
            const entityToUpdateId = this.rawData.findIndex((ent) => ent.id === id);
            if (!entityToUpdate) reject("Not found");
            const updatedEntity = JSON.parse(JSON.stringify(entityToUpdate));
            Object.entries(values).forEach(([key, value]) => {
                updatedEntity[key] = value;
            });
            this.rawData = [
                ...this.rawData.slice(0, entityToUpdateId),
                updatedEntity,
                ...this.rawData.slice(entityToUpdateId + 1)
            ];
            resolve(updatedEntity);
        });
    }

    deleteById(id: string): Promise<boolean> {
        return new Promise((resolve) => {
            this.rawData = this.rawData.filter((cons) => cons.id !== id);
            resolve(true);
        });
    }

    getAll(
        text?: string,
        currentPage = 1,
        pageSize = 10
    ): Promise<{ documents: T[]; totals: number; pagination: Pagination }> {
        return new Promise((resolve) => {
            const firstIndex = (currentPage - 1) * pageSize;
            const lastIndex = firstIndex + pageSize;

            if (text?.trim()) {
                const results = this.rawData.filter((item) =>
                    Object.values(item)
                        .filter((val) => typeof val === "string")
                        .some((val) => val.toLowerCase().includes(text?.trim()?.toLowerCase()))
                );
                resolve({
                    documents: results?.slice(firstIndex, lastIndex),
                    totals: results.length,
                    pagination: calculatePagination({ totals: results.length, page: currentPage, size: pageSize })
                });
            }

            const results = this.rawData?.slice(firstIndex, lastIndex);

            resolve({
                documents: results,
                totals: this.rawData.length,
                pagination: calculatePagination({ totals: this.rawData.length, page: currentPage, size: pageSize })
            });
        });
    }

    getById(id: string): Promise<T | undefined> {
        return new Promise((resolve) => {
            resolve(this.rawData.find((pat) => pat?.id === id));
        });
    }

    getRandom(): Promise<T | undefined> {
        return new Promise((resolve) => {
            resolve(this.rawData[Math.floor(Math.random() * this.rawData.length)]);
        });
    }
}

export default Entities;
