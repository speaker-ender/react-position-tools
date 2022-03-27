import type { NextPage } from 'next'
import ComponentLayout from '../../components/layouts/documentation/component.layout';

const CursorContextProviderPage: NextPage = () => {

    return (
        <ComponentLayout componentName='CursorContextProvider'
            description={[]}
            parameters={[
                {
                    name: "listenerInterval",
                    type: "number",
                    optional: true
                },
                {
                    name: "stateInterval",
                    type: "number",
                    optional: true
                },
            ]}
        />
    )
}

export default CursorContextProviderPage
