import BottomSheet, {
  BottomSheetView,
  useBottomSheetSpringConfigs,
  useBottomSheetTimingConfigs,
} from "@gorhom/bottom-sheet";
import { atom, useAtom } from "jotai";
import React, { useCallback, useMemo, useRef, useEffect } from "react";

// Atom to store BottomSheet references
const BottomSheetMapAtom = atom<Map<string, React.RefObject<BottomSheet>>>(
  new Map()
);

export function BottomSheetContent({
  name,
  children,
  snapPoints: snapPointsProp = ["25%", "50%"],
  index,
  onChange,
  ...props
}: {
  name: string;
  children: React.ReactNode;
  snapPoints?: (string | number)[];
  index?: number;
  onChange?: (index: number) => void;
  [key: string]: any;
}) {
  const [, setBottomSheetMap] = useAtom(BottomSheetMapAtom);
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Use useMemo for snapPoints
  const snapPoints = useMemo(() => snapPointsProp, [snapPointsProp]);

  useEffect(() => {
    setBottomSheetMap((prev) => new Map(prev).set(name, bottomSheetRef));
    return () => {
      setBottomSheetMap((prev) => {
        const newMap = new Map(prev);
        newMap.delete(name);
        return newMap;
      });
    };
  }, [name, setBottomSheetMap]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      console.log(`BottomSheet ${name} changed to index:`, index);
      onChange?.(index);
    },
    [name, onChange]
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={index}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      {...props}
    >
      <BottomSheetView style={{ flex: 1 }}>{children}</BottomSheetView>
    </BottomSheet>
  );
}

// Updated Hook to manage BottomSheet state
export function useBottomSheet(name: string) {
  const [bottomSheetMap] = useAtom(BottomSheetMapAtom);

  // These hooks provide the correct config types
  const springConfigs = useBottomSheetSpringConfigs({});
  const timingConfigs = useBottomSheetTimingConfigs({});

  type AnimationConfigs =
    | Partial<typeof springConfigs>
    | Partial<typeof timingConfigs>;

  const getSheet = useCallback(() => {
    const sheet = bottomSheetMap.get(name);
    if (sheet && sheet.current) {
      return sheet.current;
    } else {
      console.error(`BottomSheet ${name} not found`);
      return null;
    }
  }, [bottomSheetMap, name]);

  const snapToIndex = useCallback(
    (index: number, animationConfigs?: AnimationConfigs) => {
      const sheet = getSheet();
      if (sheet) {
        sheet.snapToIndex(index, animationConfigs);
      }
    },
    [getSheet]
  );

  const snapToPosition = useCallback(
    (position: number, animationConfigs?: AnimationConfigs) => {
      const sheet = getSheet();
      if (sheet) {
        sheet.snapToPosition(position, animationConfigs);
      }
    },
    [getSheet]
  );

  const expand = useCallback(
    (animationConfigs?: AnimationConfigs) => {
      const sheet = getSheet();
      if (sheet) {
        sheet.expand(animationConfigs);
      }
    },
    [getSheet]
  );

  const collapse = useCallback(
    (animationConfigs?: AnimationConfigs) => {
      const sheet = getSheet();
      if (sheet) {
        sheet.collapse(animationConfigs);
      }
    },
    [getSheet]
  );

  const close = useCallback(
    (animationConfigs?: AnimationConfigs) => {
      const sheet = getSheet();
      if (sheet) {
        sheet.close(animationConfigs);
      }
    },
    [getSheet]
  );

  const forceClose = useCallback(
    (animationConfigs?: AnimationConfigs) => {
      const sheet = getSheet();
      if (sheet) {
        sheet.forceClose(animationConfigs);
      }
    },
    [getSheet]
  );

  return {
    snapToIndex,
    snapToPosition,
    expand,
    collapse,
    close,
    forceClose,
  };
}
