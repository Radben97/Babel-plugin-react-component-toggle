const { pluginTester } = require("babel-plugin-tester");
const testFunc = require('../../src/plugin');


pluginTester({
    plugin: testFunc,
    babelOptions: {
    plugins: ['@babel/plugin-syntax-jsx'],
    sourceType: 'module'
    },
    tests: [{
        title: 'Test1: To check if plugin resolves AND gating when flag is true',
        code: `
            const app = () => {
                return <div>
                {TEST_FLAG && <Component/>}
                </div>
                };
            
        `,
        snapshot: true,
        pluginOptions: {
            flagSet: { TEST_FLAG: true, internalflag: false }
        }
    },
        {
        title: 'Test2: To check if plugin resolves AND gating when flag is false',
        code: `
            const app = () => {
                return <div>
                {internalflag && <Component/>}
                </div>
                };
            
        `,
        snapshot: true,
        pluginOptions: {
            flagSet: { TEST_FLAG: true, internalflag: false }
        }
    },
        {
        title: 'Test3: To check if plugin resolves conditionalExpressions when flag is true',
        code: `
            import {Component,Component1} from 'react'    
            const app = () => {
                return <div>
                {TEST_FLAG ? <Component/> : <Component1/>}
                </div>
                }
            `,
        snapshot: true,
        pluginOptions: {
            flagSet: { TEST_FLAG: true, internalflag: false }
        }
        },
        {
        title: 'Test4: To check if plugin resolves conditionalExpressions when flag is false',
        code: `
            import {Component,Component1} from 'react'    
            const app = () => {
                return <div>
                {internalflag ? <Component/> : <Component1/>}
                </div>
                }
            `,
        snapshot: true,
        pluginOptions: {
            flagSet: { TEST_FLAG: true, internalflag: false }
        }
        },
        {
            title: 'Test5: To check if plugin resolves function calls when flag is true (functionDeclaration)',
            code: `
                import {Component1,Component2} from 'react'
                function getLayout() {
                    if (TEST_FLAG) {
                        return <Component1/>
                    } else {
                        return <Component2/>    
                    }
                }
                const app = () => {
                return <div>
                {getLayout()}
                </div>
                }
            `,
            snapshot: true,
            pluginOptions: {
            flagSet: { TEST_FLAG: true, internalflag: false }
        }
        },
        {
            title: 'Test6: To check if plugin resolves function calls when flag is false (functionDeclaration)',
            code: `
                import {Component1,Component2} from 'react'
                function getLayout() {
                    if (internalflag) {
                        return <Component1/>
                    } else {
                        return <Component2/>    
                    }
                }
                const app = () => {
                return <div>
                {getLayout()}
                </div>
                }
            `,
            snapshot: true,
            pluginOptions: {
            flagSet: { TEST_FLAG: true, internalflag: false }
        }
        },
        {
            title: 'Test7: To check if plugin resolves function calls when flag is true (functionExpression)',
            code: `
                import {Component1,Component2} from 'react'
                const getLayout = () => {
                    if (TEST_FLAG) {
                        return <Component1/>
                    } else {
                        return <Component2/>    
                    }
                }
                const app = () => {
                return <div>
                {getLayout()}
                </div>
                }
            `,
            snapshot: true,
            pluginOptions: {
            flagSet: { TEST_FLAG: true, internalflag: false }
        }
        },
        {
            title: 'Test8: To check if plugin resolves function calls when flag is false (functionExpression)',
            code: `
                import {Component1,Component2} from 'react'
                const getLayout = () => {
                    if (internalflag) {
                        return <Component1/>
                    } else {
                        return <Component2/>    
                    }
                }
                const app = () => {
                return <div>
                {getLayout()}
                </div>
                }
            `,
            snapshot: true,
            pluginOptions: {
            flagSet: { TEST_FLAG: true, internalflag: false }
        }
        },
        {
            title: 'Test9: To check if plugin resolves variables with a jsx element',
            code: `
                
                const component = <div>hello</div>
                const app = () => {
                return <div>
                {TEST_FLAG && component}
                </div>
                }
            `,
            snapshot: true,
            pluginOptions: {
            flagSet: { TEST_FLAG: true, internalflag: false }
        }

        },
        {
            title: 'Test10: To check if plugin doesnt resolve AND gating for an flag not mentioned by the user',
        code: `
            const app = () => {
                return <div>
                {TEST_FLAG12 && <Component/>}
                </div>
                };
            
        `,
        snapshot: true,
        pluginOptions: {
            flagSet: { TEST_FLAG: true, internalflag: false }
        }
        },
        {
            title: 'Test11: To check if plugin doesnt resolve a function call for flag that is not mentioned by the user',
            code: `
                import {Component1,Component2} from 'react'
                const getLayout = () => {
                    if (TEST_FLAG123) {
                        return <Component1/>
                    } else {
                        return <Component2/>    
                    }
                }
                const app = () => {
                return <div>
                {getLayout()}
                </div>
                }
            
        `,
        snapshot: true,
        pluginOptions: {
            flagSet: { TEST_FLAG: true, internalflag: false }
        }
        },
        {
            title: 'Test12: If plugin skips toggling if it isnt part of the 5 expressions(conditional expression)',
            code: `
            import {Component,Component1} from 'react'
            const isEnabled = TEST_FLAG && <Component />;
            const app = () => {
                return <div>
                {TEST_FLAG ? (SHOW_AD ? <AdBanner /> : <ComponentRender3 />) : (IS_MAINTENANCE ? <MaintenanceMode /> : null)
                }
                <>{internalflag && <div>hello</div>}</>
                <div>{isEnabled}</div>
                <>hello</>
                </div>
                }
            `,
            snapshot: true,
            pluginOptions: {
            flagSet: { TEST_FLAG: true, internalflag: false }
        }
        },
        {
            title: 'Test13: If plugin skips toggling if it isnt part of the 5 expressions(conditional expression)',
            code: `
            import {Component,Component1} from 'react'
            const isEnabled = TEST_FLAG && <Component />;
            const app = () => {
                return <div>
                {TEST_FLAG ? (SHOW_AD ? <AdBanner /> : <ComponentRender3 />) : (IS_MAINTENANCE ? <MaintenanceMode /> : null)
                }
                <>{internalflag && <div>hello</div>}</>
                <div>{isEnabled}</div>
                <>hello</>
                </div>
                }
            `,
            snapshot: true,
            pluginOptions: {
            flagSet: { TEST_FLAG: true, internalflag: false }
        }
        },
        {
            title: 'Test14: Test to check if conditional expression inside a map function resolves properly (enclosed in a block)',
            code: `
                import {TestComponent1, TestComponent2} from 'react'
                const app = () => {
                return <div>
                    {[1,2,3,4,5].map((item,index) =>
                    {TEST_FLAG ? <li key={index}>
                        {internalflag ? <TestComponent1/> : <TestComponent2 />}
                        <p>Item: {item} </p>
                    </li> : <p>{item}</p>
})}
                    </div>}
                
            `,
            snapshot: true,
            pluginOptions: {
            flagSet: { TEST_FLAG: true, internalflag: false }
            }
        },
        {
            title: 'Test15: Test to check if conditional expression inside a map function resolves properly ',
            code: `
                import {TestComponent1, TestComponent2} from 'react'
                const app = () => {
                return <div>
                    {[1,2,3,4,5].map((item,index) =>
                    TEST_FLAG ? <li key={index}>
                        {internalflag ? <TestComponent1/> : <TestComponent2 />}
                        <p>Item: {item} </p>
                    </li> : <p>{item}</p>
)}
                    </div>}
                
            `,
            snapshot: true,
            pluginOptions: {
            flagSet: { TEST_FLAG: true, internalflag: false }
            }
        },
        {
            title: 'Test16: Test to check if conditional expression inside a map function resolves properly (with false flag) ',
            code: `
                import {TestComponent1, TestComponent2} from 'react'
                const app = () => {
                return <div>
                    {[1,2,3,4,5].map((item,index) =>
                    internalflag ? <li key={index}>
                        {internalflag ? <TestComponent1/> : <TestComponent2 />}
                        <p>Item: {item} </p>
                    </li> : <p>{item}</p>
)}
                    </div>}
                
            `,
            snapshot: true,
            pluginOptions: {
            flagSet: { TEST_FLAG: true, internalflag: false }
            }
        }
    ]
})