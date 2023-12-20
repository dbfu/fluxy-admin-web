const componentRefs = new Map();

export function getComponentRef(componentId: number) {
  return componentRefs.get(componentId);
}

export function setComponentRef(componentId: number, componentRef: any) {
  return componentRefs.set(componentId, componentRef);
}

export function clearComponentRef() {
  componentRefs.clear();
}
