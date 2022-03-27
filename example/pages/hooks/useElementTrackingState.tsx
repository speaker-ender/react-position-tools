import type { NextPage } from 'next'
import FunctionLayout from '../../components/layouts/documentation/function.layout';

const useElementTrackingStatePage: NextPage = () => {

    return (
        <FunctionLayout functionName='useElementTrackingState'
            description={[]}
            parameters={[
                {
                    name: "trackedProperties",
                    type: "IElementState",
                    optional: true
                },
                {
                    name: "updateInterval",
                    type: "number",
                    optional: true
                },
            ]}
        />
    )
}

export default useElementTrackingStatePage
