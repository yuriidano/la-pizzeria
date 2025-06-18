import { Suspense } from "react"




export const withLazy = (Component: React.ComponentType) => () => {
    return <Suspense fallback={<></>}>
                <Component />
            </Suspense>
}


