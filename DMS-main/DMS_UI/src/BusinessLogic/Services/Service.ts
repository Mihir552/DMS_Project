import { EnvironmentValues } from "./IServiceProvider";

export abstract class Service{
    protected readonly environmentValues: EnvironmentValues;
    /**
     *
     */
    constructor(values: EnvironmentValues) {
        this.environmentValues = values;
    }
}