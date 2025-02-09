import { useState } from "react"

export const useIsLoading = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const loading = (value: boolean) => setIsLoading(value);

    return { loading, isLoading }
}
