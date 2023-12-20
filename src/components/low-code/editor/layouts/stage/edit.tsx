import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import HoverMask from '../../common/hover-mask';
import SelectedMask from '../../common/selected-mask';
import { useComponentConfigStore } from '../../stores/component-config';
import { Component, useComponentsStore } from '../../stores/components';


const EditStage = (_: any, ref: any) => {

  const { components, curComponentId, setCurComponentId } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  const [hoverComponentId, setHoverComponentId] = useState();


  const selectedMaskRef = useRef<any>(null);

  useImperativeHandle(ref, () => {
    return {
      updateSelectedMaskPosition: () => {
        if (selectedMaskRef?.current) {
          selectedMaskRef.current.updatePosition();
        }
      }
    }
  }, [])

  // 组件改变后，重新渲染遮罩
  useEffect(() => {
    if (selectedMaskRef?.current) {
      selectedMaskRef.current.updatePosition();
    }
  }, [components]);

  useEffect(() => {
    function createMask(e: any) {
      // 获取当前点击的元素
      const path = e.composedPath();

      for (let i = 0; i < path.length; i += 1) {
        const ele = path[i];
        if (ele.getAttribute && ele.getAttribute("data-component-id")) {
          const componentId = ele.getAttribute("data-component-id");
          setCurComponentId(componentId);
          setHoverComponentId(undefined);
          return;
        }
      }
    }

    let container = document.querySelector(".stage");

    if (container) {
      container.addEventListener('click', createMask, true);
    }
    return () => {
      container = document.querySelector(".stage");
      if (container) {
        container.removeEventListener("click", createMask, true);
      }
    }
  }, []);


  useEffect(() => {
    function createMask(e: any) {
      // 获取当前点击的元素
      const path = e.composedPath();

      for (let i = 0; i < path.length; i += 1) {
        const ele = path[i];
        if (ele.getAttribute && ele.getAttribute("data-component-id")) {
          const componentId = ele.getAttribute("data-component-id");
          if (componentId) {
            if (curComponentId === componentId) {
              setHoverComponentId(undefined);
            } else {
              setHoverComponentId(componentId);
            }
            return;
          }
        }
      }
    }

    function removerMask() {
      setHoverComponentId(undefined);
    }

    let container = document.querySelector(".stage");

    if (container) {
      container.addEventListener('mouseover', createMask, true);
      container.addEventListener('mouseleave', removerMask);
    }
    return () => {
      container = document.querySelector(".stage");
      if (container) {
        container.removeEventListener("mouseover", createMask, true);
        container.removeEventListener('mouseleave', removerMask);
      }
    }
  }, [curComponentId]);

  function formatProps(component: Component) {
    const props = Object.keys(component.props || {}).reduce<any>((prev, cur) => {

      if (typeof component.props[cur] === 'object') {
        if (component.props[cur]?.type === 'static') {
          prev[cur] = component.props[cur].value;
        } else if (component.props[cur]?.type === 'variable') {
          const variableName = component.props[cur].value;
          prev[cur] = `\${${variableName}}`;
        }
      } else {
        prev[cur] = component.props[cur];
      }

      return prev;

    }, {});

    return props;
  }

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {

      if (!componentConfig?.[component.name]?.dev) {
        return null;
      }

      const props = formatProps(component);

      return React.createElement(
        componentConfig[component.name]?.dev,
        {
          key: component.id,
          _id: component.id,
          _name: component.name,
          ...component.props,
          ...props,
        },
        renderComponents(component.children || [])
      )
    })
  }

  return (
    <div className='h-[100%] stage'>
      <React.Suspense fallback="loading...">
        {renderComponents(components)}
      </React.Suspense>
      {curComponentId && (
        <SelectedMask
          containerClassName='select-mask-container'
          offsetContainerClassName='stage'
          ref={selectedMaskRef}
        />
      )}
      {hoverComponentId && (
        <HoverMask
          containerClassName='select-mask-container'
          offsetContainerClassName='stage'
          ref={selectedMaskRef}
          componentId={hoverComponentId}
        />
      )}
      <div className="select-mask-container" />
    </div>
  )
}

export default forwardRef(EditStage);