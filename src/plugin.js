export default function testFunc(babel) {
  const { types: t } = babel;
  let flagVal;
  let deadFunc = {};
  let flagSet = {TEST_FLAG: true, internalflag: false};
  function funcBlock(flagSet,calleeName,callee,innerPath,isValidLogicExp,validFlagCheck,falseFlag,componentName,elementNode) {
  		let funcDeclaration;
    	if (calleeName){funcDeclaration = innerPath.scope.getBinding(calleeName);} 
    	if (funcDeclaration && !funcDeclaration.constant) return;
    	let bodyBlock;
    	let ifStatement;
    	if (funcDeclaration && funcDeclaration.path.isVariableDeclarator()) {
         
          if (funcDeclaration.path.get("init").isFunction()) {	
          bodyBlock = funcDeclaration.path.get("init").get("body").get("body");
          } 
        }
    	if (funcDeclaration && funcDeclaration.path.isFunctionDeclaration()){
          bodyBlock = funcDeclaration.path.get("body").get("body");
        }
    	if (innerPath.get("callee").isArrowFunctionExpression()) {
          bodyBlock = innerPath.get("callee").get("body").get("body");
        }
      	if (bodyBlock && bodyBlock.length !== 1) innerPath.skip();
      	if(bodyBlock) {ifStatement = bodyBlock.find(p => p.isIfStatement());}
      	if (ifStatement) {
        	const tester = ifStatement.get("test").node.name;
          	if (Object.hasOwn(flagSet,tester)) {
              		  flagVal = flagSet[tester];
            		  isValidLogicExp = true;
                      validFlagCheck = true;
                      let returnStatement1 = null;
                      let returnStatement2 = null;
                      let bodyPath1;
                      let bodyPath2;
              		  let truecomponentName;
              		  let falsecomponentName;
              		  let trueelementNode;
              		  let falseelementNode;
              		  let varComponent1;
              		  let varComponent2;
              		  let varName1;
              		  let varName2;
              		  let jsxComponentCheck1;
              		  let jsxComponentCheck2;
                      
                      if (ifStatement.get("consequent").isBlockStatement()){
                      		bodyPath1 = ifStatement.get("consequent").get("body");
                        	if (bodyPath1) {
                            	returnStatement1 = bodyPath1.find(path => path.isReturnStatement());
                            }
                      } else {
                      		bodyPath1 = ifStatement.get("consequent");
                        	if (bodyPath1) {
                            	returnStatement1 = bodyPath1;
                            }
                      }
                      if (ifStatement.get("alternate").isBlockStatement()){
                      		bodyPath2 = ifStatement.get("alternate").get("body");
                        	if (bodyPath2) {
                            	returnStatement2 = bodyPath2.find(path => path.isReturnStatement());
                            }
                      } else {
                      		bodyPath2 = ifStatement.get("alternate");
                        	if (bodyPath2 && bodyPath2.node) {
                            	returnStatement2 = bodyPath2;
                            }
                      }
              
              		   if (returnStatement1 && returnStatement1.node.argument !== null) {
                          if (returnStatement1.get("argument").isJSXElement() && !innerPath.scope.getBinding(returnStatement1.get("argument").get("openingElement").get("name").node.name)){
                      	  truecomponentName =returnStatement1.get("argument").get("openingElement").get("name").node.name;
                          trueelementNode = returnStatement1.get("argument").node;  
                          }
                          else if (returnStatement1.get("argument").isIdentifier()) {
                            varName1 = returnStatement1.get("argument").node.name;
                          	varComponent1 = innerPath.scope.getBinding(varName1);
                            const varComponentInit =  varComponent1.path.get("init");
                            if (varComponentInit.isArrowFunctionExpression()){ 
                              console.warn("❌ [plugin-react-component-toggle]: Variables with an arrow function is not allowed for component toggle, skipping this expression ");
                              innerPath.skip();
                            } else {
                            truecomponentName = varComponentInit.get("openingElement").get("name").node.name;
                            trueelementNode = varComponentInit; }
                          }
                          if (returnStatement1.get("argument").isJSXElement() && innerPath.scope.getBinding(returnStatement1.get("argument").get("openingElement").get("name").node.name)) {
                          	varName1 = returnStatement1.get("argument").get("openingElement").get("name").node.name;
                            varComponent1 = innerPath.scope.getBinding(varName1);
                            const varComponentInit =  returnStatement1.get("argument").node;
                            truecomponentName = varName1;
                            trueelementNode = varComponentInit;
                            if (flagVal) jsxComponentCheck1 = true;
                          }
                         
                            
                        }	
              		  if (returnStatement2 && returnStatement2.node.argument !== null) {
                          falseFlag = true;
                          if (returnStatement1.get("argument").isJSXElement() && !innerPath.scope.getBinding(returnStatement1.get("argument").get("openingElement").get("name").node.name)){
                      	  falsecomponentName =returnStatement2.get("argument").get("openingElement").get("name").node.name;
                          falseelementNode = returnStatement2.get("argument").node;  
                          }
                          else if (returnStatement2.get("argument").isIdentifier()) {
                            varName2 = returnStatement2.get("argument").node.name;
                          	varComponent2 = innerPath.scope.getBinding(varName2);
                            const varComponentInit =  varComponent2.path.get("init");
                            if (varComponentInit.isArrowFunctionExpression()){ 
                              console.warn("❌ [plugin-react-component-toggle]: Variables with an arrow function is not allowed for component toggle, skipping this expression ");
                              innerPath.skip();
                        
                            } else {
                            falsecomponentName = varComponentInit.get("openingElement").get("name").node.name;
                            falseelementNode = varComponentInit;
                            }
                          }
                         if (returnStatement2.get("argument").isJSXElement() && innerPath.scope.getBinding(returnStatement2.get("argument").get("openingElement").get("name").node.name)) {
                            varName2 = returnStatement2.get("argument").get("openingElement").get("name").node.name;
                            varComponent2 = innerPath.scope.getBinding(varName2);
                            const varComponentInit =  returnStatement2.get("argument").node;
                            falsecomponentName = varName2;
                            falseelementNode = varComponentInit;
                           	if (!flagVal) jsxComponentCheck2 = true;
                          }
                            
                        }	
              		  if (flagVal) {
                       componentName = truecomponentName;
                       elementNode = trueelementNode;
                      }
              		  if(!flagVal) {
                      	componentName = falsecomponentName;
                        elementNode = falseelementNode;
                      }
              		  if (varName1 && varComponent1 && Object.hasOwn(deadFunc,varName1)) {
                        	if (!jsxComponentCheck1) deadFunc[varName1].count += 1; 
                        } else if (varName1 && varComponent1 && !Object.hasOwn(deadFunc,varName1)) {
                        	if (!jsxComponentCheck1) deadFunc[varName1] = {binding: varComponent1,count: 1};
                        }
              		  if (varName2 && varComponent2 && Object.hasOwn(deadFunc,varName2)) {
                        	if (!jsxComponentCheck2) deadFunc[varName2].count += 1; 
                        } else if (varName2 && varComponent2 && !Object.hasOwn(deadFunc,varName2)) {
                        	if (!jsxComponentCheck2) deadFunc[varName2] = {binding: varComponent2,count: 1};
                        }
              		  
              			
            } // if-tester-end
        }
     //if-varDecl-end
    return [funcDeclaration,isValidLogicExp,validFlagCheck,falseFlag,componentName,elementNode];
  }
  function funcCleaner(deadFunc,path) {
  	for (const [funcName,funcObj] of Object.entries(deadFunc)) {
      	if (funcObj.binding && (funcObj.binding.references === funcObj.count)) {
          	if (funcObj.binding.path.parentPath && funcObj.binding.path.parentPath.isImportDeclaration()) {
            	const importStatement = funcObj.binding.path.parentPath;
              	const siblings = importStatement.get("specifiers").length === 1;
              	if (siblings) importStatement.remove();
              	else funcObj.binding.path.remove();
              delete deadFunc[funcName]
            } else {
            	funcObj.binding.path.remove();
              	delete deadFunc[funcName]
            }
        }
    }
    
  }
  return {
    	name: "React-Toggle-Component",
    	visitor: {
         	JSXExpressionContainer(path,state) {
                let funcDeclaration;
              	let componentName;
              	let componentAttributes;
              	let elementNode;
              	let consequentComponent;
              	let alternateComponent;
              	let falseFlag = false;
              	let isValidLogicExp = false;
              	let validFlagCheck = false;
            	path.traverse({            
                  	ConditionalExpression(innerPath) {
                   	 if (!Object.hasOwn(flagSet,innerPath.get("test").node.name)) innerPath.skip();
                      if (!innerPath.get("alternate").isJSXElement() || !innerPath.get("consequent").isJSXElement()){
                      	console.warn("❌ [plugin-react-component-toggle]: Nested conditional expression are not allowed for component toggle, skipping this expression");
                        innerPath.skip();
                      }
                      else flagVal = flagSet[innerPath.get("test").node.name]; 
                      consequentComponent = innerPath.get("consequent").node;
                      alternateComponent = innerPath.get("alternate").node;
                      let consequentComponentName;
                      let alternateComponentName;
                      let bindingConsequent;
                      let bindingAlternate;
                      if (innerPath.get("consequent").isJSXElement()) {
                      	consequentComponentName = innerPath.get("consequent").get("openingElement").get("name").node.name;
                        if (consequentComponentName) bindingConsequent = innerPath.scope.getBinding(consequentComponentName);
                      }
                      if (innerPath.get("alternate").isJSXElement()) {
                      	alternateComponentName = innerPath.get("alternate").get("openingElement").get("name").node.name;
                      	if (alternateComponentName) bindingAlternate = innerPath.scope.getBinding(alternateComponentName);
                      }
                      if (!innerPath.get("consequent").isJSXElement() || !innerPath.get("alternate").isJSXElement()) {
                      	
                      }
                      isValidLogicExp = true;
                      validFlagCheck = true;
                      if (flagVal && innerPath.get("consequent").isJSXElement()) {
                      	componentName = innerPath.get("consequent").get("openingElement").get("name").node.name;
                        elementNode = consequentComponent;
                        if (alternateComponentName && elementNode && Object.hasOwn(deadFunc,alternateComponentName)) {
                        	deadFunc[consequentComponentName].count += 1; 
                        } else if (alternateComponentName && elementNode && !Object.hasOwn(deadFunc,alternateComponentName)) {
                        	deadFunc[alternateComponentName] = {binding: bindingAlternate,count: 1};
                        }
                        
                      }
                      if (!flagVal && innerPath.get("alternate").isJSXElement()) {
                      	componentName = innerPath.get("alternate").get("openingElement").get("name").node.name;
                        elementNode = alternateComponent;
                        falseFlag = true;
                        if (consequentComponentName && elementNode && Object.hasOwn(deadFunc,consequentComponentName)) {
                        	deadFunc[consequentComponentName].count += 1; 
                        } else if (consequentComponentName && elementNode && !Object.hasOwn(deadFunc,consequentComponentName)) {
                        	deadFunc[consequentComponentName] = {binding: bindingConsequent,count: 1};
                        }
                      }
                      
                    },
                  	LogicalExpression(innerPath) {
                    	if (!innerPath.get("left").isLogicalExpression() && !innerPath.get("right").isLogicalExpression() && innerPath.node.operator === "&&") {
                        	isValidLogicExp = true;
                          	let logicalComponentName;
                          	if (innerPath.get("left").isIdentifier() && Object.hasOwn(flagSet,innerPath.get("left").node.name)) {
                              flagVal = flagSet[innerPath.get("left").node.name];
                              if (innerPath.get("right").isJSXElement()) {
                              	logicalComponentName = innerPath.get("right").get("openingElement").get("name").node.name;
                              	elementNode = innerPath.get("right").node;
                              	componentName = innerPath.get("right").get("openingElement").get("name").node.name;
                                validFlagCheck = true;
                              } else if (innerPath.get("right").isIdentifier()){
                              	logicalComponentName = innerPath.get("right").node.name;
                                const binding = innerPath.scope.getBinding(logicalComponentName);
                               
                                if (binding) {
                                elementNode = binding.path.get("init").node;
                              	componentName = logicalComponentName;
                                validFlagCheck = true;
                                }
                              }
                            };
                          	
                          	if (innerPath.get("right").isIdentifier() && Object.hasOwn(flagSet,innerPath.get("right").node.name)) {
                              flagVal = flagSet[innerPath.get("right").node.name];
                              if (innerPath.get("left").isJSXElement()) {
                              	logicalComponentName = innerPath.get("left").get("openingElement").get("name").node.name;
                              	elementNode = innerPath.get("left").node;
                              	componentName = innerPath.get("left").get("openingElement").get("name").node.name;
                                validFlagCheck = true;
                              } else if (innerPath.get("left").isIdentifier()){
                              	logicalComponentName = innerPath.get("left").node.name;
                                const binding = innerPath.scope.getBinding(logicalComponentName);
                               
                                if (binding) {
                                elementNode = binding.path.get("init").node;
                              	componentName = logicalComponentName;
                                validFlagCheck = true;
                                }
                              }
                            };
                          const logicalComonentBinding = innerPath.scope.getBinding(logicalComponentName);
                          if (logicalComponentName && logicalComonentBinding && Object.hasOwn(deadFunc,logicalComponentName)) {
                        	deadFunc[logicalComponentName].count += 1; 
                        } else if (logicalComponentName && logicalComonentBinding && !Object.hasOwn(deadFunc,logicalComponentName)) {
                        	deadFunc[logicalComponentName] = {binding: logicalComonentBinding,count: 1};
                        }
                          	
                        } else {
                          	if (innerPath.node.operator !== "&&") console.warn("❌ [plugin-react-component-toggle]: Logical expressions should have '&&' operator for component toggle, skipping this expression ");
                        	console.warn("❌ [plugin-react-component-toggle]: Nested logical expressions are not allowed for component toggle, skipping this expression ");
                        }
                        
                    },
                  	CallExpression(innerPath) {
                    	const callee = innerPath.get("callee");
                      	const calleeName = callee.node.name;
                      	if (!callee.isIdentifier() || !callee.isArrowFunctionExpression()) {
                      
                          innerPath.skip()};
                      	[funcDeclaration,isValidLogicExp,validFlagCheck,falseFlag,componentName,elementNode] = funcBlock(flagSet,calleeName,callee,innerPath,isValidLogicExp,validFlagCheck,falseFlag,componentName,elementNode);
                      	if (calleeName && elementNode && Object.hasOwn(deadFunc,calleeName)) {
                        	deadFunc[calleeName].count += 1; 
                        } else if (calleeName && elementNode && !Object.hasOwn(deadFunc,calleeName)) {
                        	deadFunc[calleeName] = {binding: funcDeclaration,count: 1};
                        }
                    }// end
                  	
                });
              	if(componentName && isValidLogicExp && validFlagCheck && flagVal){
                	path.replaceWith(elementNode);
                  	//funcCleaner(deadFunc,path);
                  	
                }
              	else if (componentName && isValidLogicExp && validFlagCheck && !flagVal) {
                  	if (!falseFlag) path.remove();
                  	else {path.replaceWith(elementNode);
                         }
                  	//funcCleaner(deadFunc,path);
                }
            },
          	Program: {
            	exit(path) {
                  path.scope.crawl();
                  funcCleaner(deadFunc, path);
                  path.traverse({
                    	JSXFragment(path) {
                        	if (path.get("children").length < 1) {
                            	path.skip()
                            } 
                          path.remove();
                        }
                    })
                }
            }// short-circuiting conversion completed
        }
    }
  }
