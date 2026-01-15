const babel = require("@babel/core");
const plugin = require("../../../src/plugin");



it('Test1: empty node existence checking', () => {
    let exampleCode = `<div>{internalflag && <component/>}</div>`
    const { ast,code } = babel.transformSync(exampleCode, {
        plugins: ['@babel/plugin-syntax-jsx', plugin],
        ast: true,
        code: true
    });
    const divContainer = ast.program.body.find(p => p.type === 'ExpressionStatement');
    const divChildren = divContainer.expression.children;
    console.log(code);
    expect(divChildren.length).toBe(0);
});

it('test2: empty node existence checking (more complex one)', () => {
    let exampleCode = `
    import Component from 'react'
    const componentRender = <div>hello</div>
    const app = () => {
        
        return <div>
        {TEST_FLAG && <Component/>}
        {TEST_FLAG && componentRender}
        </div>
        }
    
    `
    const { ast, code } = babel.transformSync(exampleCode, {
        plugins: ['@babel/plugin-syntax-jsx', plugin],
        ast: true,
        code: true
    });
    const topContainer = ast.program.body;
    expect(topContainer.length).toBe(1);
});

it('test3: to check whether a node is intact if given flag is not valid', () => {
    let exampleCode = `
    import Component from 'react'

    const app = () => {
        const componentRender = <div>hello</div>
        return <div>
        {TEST_FLAG12 && <Component/>}
        {TEST_FLAG12 && componentRender}
        </div>
        }
    
    `
    const { ast, code } = babel.transformSync(exampleCode, {
        plugins: ['@babel/plugin-syntax-jsx', plugin],
        ast: true,
        code: true
    });
    const divContainer = ast.program.body.find(c => c.type === 'VariableDeclaration');
    const divFunc = divContainer.declarations[0].init;
    const divParentReturn = divFunc.body.body[1];
    const div = divParentReturn.argument;
    const divChildren = div.children;
    expect(divChildren.length).toBe(5);
    const jsxContainers = divChildren.filter(p => p.type === 'JSXExpressionContainer');
    expect(jsxContainers.length).toBe(2)
});
it('test4: to check whether a node is intact if given flag is not valid', () => {
    let exampleCode = `
    import React from 'react';
import {ComponentRender3,TestComponent1} from 'react';
<div>hello</div>
// CASE 4: Prop Drilling (Middle Layer)
const MiddleLayer = ({ isFeatureOn }) => (
  <div className="middle-layer">
    <DeepComponent isFeatureOn={isFeatureOn} />
  </div>
);


const TestComponent2 = () => (
  <div className="comp-2">
    {console.log("Rendering Component 2")}
    <h1>Standard UI</h1>
  </div>
);

const componentRender2 = (
    <div className="wrapper-b">
  {internalflag && <TestComponent1 />}
  <TestComponent5 />
    </div>
  );
const componentRender3 = (<div>hello</div>)
const getLayout1 = () => {
    	if (internalflag){
        	return componentRender2
        } else {
        	return componentRender2
        }
    }

function getLayout() {
    if (internalflag) {
      return <ComponentRender3/>;
    } else return <TestComponent5 />;
  };
const getLayout2 = () => <div>hello</div>

const App = () => {
  return (
    <div className="app-root">
      
      <header>
        <h1>Product Dashboard</h1>
      </header>

      
      
      {internalflag ? <ContentComponent /> : <MiddleLayer isFeatureOn = {isFeatureOn}/>}
      {TEST_FLAG && componentRender3}

     

      
      {getLayout()}
       {getLayout1()}
	  {getLayout2()}
       

      
       {TEST_FLAG 
  ? (SHOW_AD ? componentRender2 : <ComponentRender3 />) 
  : (IS_MAINTAINANCE ? <MaintenanceMode/> : null)
}
       <></>
      <ContentComponent flag={internalFlag} />
        
      <footer>System Status: {internalFlag ? "Stable" : "Legacy"}</footer>
       
    </div>
  );
};

export default App;
       
function greet() {}
    
    `
    const { ast, code } = babel.transformSync(exampleCode, {
        plugins: ['@babel/plugin-syntax-jsx', plugin],
        ast: true,
        code: true
    });
    
    
    const program = ast.program;
    expect(jsxContainers.length).toBe(code)
});