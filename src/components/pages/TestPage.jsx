
import ErrorBoundry from '../shared/ErrorBoundry/ErrorBoundry'

const TestPage = () => {

    return (
        <div>
            <h1>TestPage</h1>
            <ul>
                <ErrorBoundry>
                <li>First</li>
                </ErrorBoundry>
                <ErrorBoundry>
                <li>Second</li>
                </ErrorBoundry>
                <ErrorBoundry>
                <li>Third</li>
                </ErrorBoundry>
            </ul>
        </div>
    )
}

export default TestPage