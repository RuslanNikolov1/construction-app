"use client";

import { useEffect, useRef } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import { Color } from "three";
import styles from "./ConstructionSection.module.scss";

type ConstructionModelViewerProps = {
  ariaLabel?: string;
  className?: string;
};

export function ConstructionModelViewer({
  ariaLabel = "3D конструкция на къща, въртете с плъзгане",
  className,
}: ConstructionModelViewerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let mounted = true;

    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/34dffbbf-3473-4123-bba1-7cdc517fd77b',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'14c65c'},body:JSON.stringify({sessionId:'14c65c',location:'ConstructionModelViewer.tsx:useEffect',message:'useEffect mount — starting viewer init',data:{origin:window.location.origin},runId:'post-fix2',hypothesisId:'H-F',timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    const viewer = new IfcViewerAPI({
      container,
      backgroundColor: new Color(0xffffff),
    });

    viewer.axes.setAxes();
    viewer.grid.setGrid();

    // Mirror ifcjs-react sample: configure via loader.ifcManager directly
    viewer.IFC.loader.ifcManager.applyWebIfcConfig({
      COORDINATE_TO_ORIGIN: true,
      USE_FAST_BOOLS: false,
    });

    const loadModel = async () => {
      try {
        // SetWasmPath must be called with absolute=true on the underlying IfcAPI
        // so Turbopack's scriptDirectory prefix is NOT prepended to the WASM path.
        // web-ifc-three's setWasmPath() wrapper does not forward the absolute flag,
        // so we access the IfcAPI directly.
        const ifcApi = (viewer.IFC.loader.ifcManager as unknown as {
          state?: { api?: { SetWasmPath?: (path: string, absolute: boolean) => void } };
        }).state?.api;

        if (ifcApi?.SetWasmPath) {
          ifcApi.SetWasmPath("/wasm/", true);
        }

        // #region agent log
        fetch('http://127.0.0.1:7245/ingest/34dffbbf-3473-4123-bba1-7cdc517fd77b',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'14c65c'},body:JSON.stringify({sessionId:'14c65c',location:'ConstructionModelViewer.tsx:after-setWasmPath',message:'SetWasmPath called with absolute=true',data:{hasIfcApi:!!ifcApi,hasSetWasmPath:!!ifcApi?.SetWasmPath,mounted},runId:'post-fix2',hypothesisId:'H-F',timestamp:Date.now()})}).catch(()=>{});
        // #endregion

        if (!mounted) return;

        const model = await viewer.IFC.loadIfcUrl("/3D_model.ifc");

        // #region agent log
        fetch('http://127.0.0.1:7245/ingest/34dffbbf-3473-4123-bba1-7cdc517fd77b',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'14c65c'},body:JSON.stringify({sessionId:'14c65c',location:'ConstructionModelViewer.tsx:model-loaded',message:'loadIfcUrl success',data:{modelID:model?.modelID,mounted},runId:'post-fix',hypothesisId:'H-E',timestamp:Date.now()})}).catch(()=>{});
        // #endregion

        if (!mounted) return;

        if (viewer.shadowDropper && model?.modelID !== undefined) {
          await viewer.shadowDropper.renderShadow(model.modelID);
        }
      } catch (error) {
        // #region agent log
        fetch('http://127.0.0.1:7245/ingest/34dffbbf-3473-4123-bba1-7cdc517fd77b',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'14c65c'},body:JSON.stringify({sessionId:'14c65c',location:'ConstructionModelViewer.tsx:loadModel-catch',message:'loadModel error',data:{error:String(error),mounted},runId:'post-fix',hypothesisId:'H-E',timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        if (mounted) console.error("Failed to load IFC model:", error);
      }
    };

    loadModel();

    // Restrict interactions to rotation only
    try {
      const controls = (viewer as unknown as {
        context?: { ifcCamera?: { controls?: { enablePan?: boolean; enableZoom?: boolean } } };
      }).context?.ifcCamera?.controls;
      if (controls) {
        controls.enablePan = false;
        controls.enableZoom = false;
      }
    } catch {
      // Fallback via DOM event handlers
    }

    return () => {
      mounted = false;
      // #region agent log
      fetch('http://127.0.0.1:7245/ingest/34dffbbf-3473-4123-bba1-7cdc517fd77b',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'14c65c'},body:JSON.stringify({sessionId:'14c65c',location:'ConstructionModelViewer.tsx:cleanup',message:'cleanup — mounted set to false',data:{},runId:'post-fix',hypothesisId:'H-D',timestamp:Date.now()})}).catch(()=>{});
      // #endregion
    };
  }, []);

  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (event) => {
    // Prevent scroll wheel zoom
    event.preventDefault();
    event.stopPropagation();
  };

  const handlePointerDown: React.PointerEventHandler<HTMLDivElement> = (
    event
  ) => {
    // Allow primary button (left click / touch) for rotation.
    // Block middle/right button drags that are usually mapped to pan.
    if (event.button !== 0) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleContextMenu: React.MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    // Prevent right-click context menu (which could interfere with viewer)
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.ConstructionModelCanvas}${
        className ? ` ${className}` : ""
      }`}
      aria-label={ariaLabel}
      role="img"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onContextMenu={handleContextMenu}
    />
  );
}

