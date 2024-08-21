import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
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

// Hook to manage BottomSheet state
export function useBottomSheet(name: string) {
  const [bottomSheetMap] = useAtom(BottomSheetMapAtom);

  const expandSheet = useCallback(() => {
    const sheet = bottomSheetMap.get(name);
    if (sheet && sheet.current) {
      sheet.current.expand();
    } else {
      console.error(`BottomSheet ${name} not found`);
    }
  }, [bottomSheetMap, name]);

  const collapseSheet = useCallback(() => {
    const sheet = bottomSheetMap.get(name);
    if (sheet && sheet.current) {
      sheet.current.collapse();
    } else {
      console.error(`BottomSheet ${name} not found`);
    }
  }, [bottomSheetMap, name]);

  const closeSheet = useCallback(() => {
    const sheet = bottomSheetMap.get(name);
    if (sheet && sheet.current) {
      sheet.current.close();
    } else {
      console.error(`BottomSheet ${name} not found`);
    }
  }, [bottomSheetMap, name]);

  return { expandSheet, collapseSheet, closeSheet };
}
