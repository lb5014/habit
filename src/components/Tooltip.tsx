// src/components/Tooltip.tsx

import React, { useState, useCallback, ReactNode, CSSProperties, MouseEvent } from 'react';
import './Tooltip.css';

interface Position {
  x: number;
  y: number;
}

interface TooltipProps {
  /** 툴팁에 표시할 메시지입니다. */
  text: string; 
  /** 툴팁을 적용할 단일 React 요소입니다. (예: <button>) */
  children: ReactNode; 
}

/**
 * 마우스 커서를 따라다니는 '툴팁(Tooltip)' 컴포넌트
 * children 요소에 마우스를 올리면 메시지를 표시하고, 커서 이동에 따라 위치가 업데이트됩니다.
 */
const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  // isVisible (보임/숨김) 상태 관리
  const [isVisible, setIsVisible] = useState(false);
  // position ({ x: number, y: number }) 상태 관리
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  // (가장 중요) children 요소에서 onMouseMove 이벤트를 추적하여 position 업데이트
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({
      x: e.clientX, // 현재 뷰포트 기준 X 좌표
      y: e.clientY, // 현재 뷰포트 기준 Y 좌표
    });
  }, []);

  // children 요소에 onMouseEnter 이벤트 발생 시 isVisible을 true로 설정
  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  // children 요소에서 onMouseLeave 이벤트 발생 시 isVisible을 false로 설정
  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  // children이 단일 React 요소인지 확인
  if (!React.isValidElement(children)) {
    // children이 유효하지 않은 경우, 툴팁 기능을 무시하고 텍스트만 렌더링
    return <>{children}</>;
  }

  // children 요소에 필요한 마우스 이벤트를 주입합니다.
  const enhancedChildren = React.cloneElement(children, {
    // 기존 이벤트 핸들러가 있다면 함께 실행하도록 처리 (TypeScript 경고 무시)
    onMouseEnter: (e: MouseEvent) => {
      // @ts-ignore
      if (children.props.onMouseEnter) children.props.onMouseEnter(e);
      handleMouseEnter();
    },
    onMouseLeave: (e: MouseEvent) => {
      // @ts-ignore
      if (children.props.onMouseLeave) children.props.onMouseLeave(e);
      handleMouseLeave();
    },
    onMouseMove: (e: MouseEvent) => {
      // @ts-ignore
      if (children.props.onMouseMove) children.props.onMouseMove(e);
      handleMouseMove(e);
    },
  });

  // 렌더링 요구사항: style 속성을 사용한 위치 설정
  const tooltipStyle: CSSProperties = {
    position: 'fixed',
    // top: position.y + 15 px, left: position.x + 15 px (커서 바로 아래/오른쪽에 뜨도록)
    top: position.y + 15,
    left: position.x + 15,
    // 툴팁 자신이 마우스 이벤트를 가로채지 않도록 설정
    pointerEvents: 'none',
  };

  return (
    <>
      {enhancedChildren}
      {/* isVisible이 true일 때만 툴팁 div를 렌더링 */}
      {isVisible && (
        <div className="tooltip-popup" style={tooltipStyle}>
          {text}
        </div>
      )}
    </>
  );
};

export default Tooltip;