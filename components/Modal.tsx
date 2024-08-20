import { BottomSheetMapAtom } from "@/lib/atom/atoms";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useAtom } from "jotai";
import React, { useCallback, useEffect, useRef, useMemo } from "react";

// Hook to manage modal state and actions
export function useModal(name: string) {
  const [bottomSheetMap] = useAtom(BottomSheetMapAtom);

  const openModal = useCallback(() => {
    const modal = bottomSheetMap.get(name);
    if (modal) {
      modal.present();
    } else {
      console.error("Modal not found in BottomSheetMap");
    }
  }, [bottomSheetMap, name]);

  const closeModal = useCallback(() => {
    const modal = bottomSheetMap.get(name);
    if (modal) {
      modal.dismiss();
    } else {
      console.error("Modal not found in BottomSheetMap");
    }
  }, [bottomSheetMap, name]);

  return { openModal, closeModal };
}

export function ModalContent({
  name,
  children,
  snapPoints: snapPointsProp = ["25%", "50%"],
  index = 0,
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
  const [, setBottomSheetRef] = useAtom(BottomSheetMapAtom);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Use useMemo for snapPoints
  const snapPoints = useMemo(() => snapPointsProp, [snapPointsProp]);

  useEffect(() => {
    // console.log(`Registering modal: ${name}`);
    setBottomSheetRef((prev) =>
      new Map(prev).set(name, bottomSheetModalRef.current)
    );
    return () => {
      // console.log(`Unregistering modal: ${name}`);
      setBottomSheetRef((prev) => {
        const newMap = new Map(prev);
        newMap.delete(name);
        return newMap;
      });
    };
  }, [name, setBottomSheetRef]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      // console.log(`Modal ${name} changed to index:`, index);
      onChange?.(index);
    },
    [name, onChange]
  );

  // console.log(`Rendering ModalContent for ${name}`);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={index}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      {...props}
    >
      <BottomSheetView style={{ flex: 1 }}>{children}</BottomSheetView>
    </BottomSheetModal>
  );
}
