import _ from "lodash";
import { useCallback, useEffect, useState } from "react";

function useForm<T extends Record<string, unknown>>(initialData: T, validationsSchema?: Record<string, unknown>) {
    const [data, setData] = useState<T>(initialData);
    const [isDataChanged, setIsDataChanged] = useState<boolean>(false);

    const validateField = useCallback(
        (field: string, value: unknown) => {
            if (!validationsSchema) return true;
            console.log(field, value);
            // validationsSchema[field]?.safeParse(value);
        },
        [validationsSchema]
    );

    const handleChange = useCallback(
        async (field: string, value: string, shouldDirty = true) => {
            validateField(field, value);
            setData((prevState) => {
                const copyObject = {
                    ...prevState,
                    [field]: value
                };

                if (shouldDirty) setIsDataChanged(!_.isEqual(copyObject, initialData));
                return copyObject;
            });
        },
        [initialData, validateField]
    );

    useEffect(() => {
        if (initialData && Object.keys(initialData || {}).length) setData(initialData);
    }, [initialData]);

    return {
        data,
        handleChange,
        isDataChanged
    };
}

export default useForm;
