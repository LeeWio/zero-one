import { useMemo } from "react";
import {
  type LinkFloatingToolbarState as LinkMenuProps,
  FloatingLinkUrlInput,
  useFloatingLinkEdit,
  useFloatingLinkEditState,
  useFloatingLinkInsert,
  useFloatingLinkInsertState,
} from "@platejs/link/react";
import {
  type UseVirtualFloatingOptions,
  flip,
  offset,
} from "@platejs/floating";
import { useFormInputProps, usePluginOption } from "platejs/react";

import { KEYS } from "platejs";

export function LinkMenu({ state }: { state?: LinkMenuProps }) {
  // Get the currently active comment ID (if any)
  const activeCommentId = usePluginOption({ key: KEYS.comment }, "activeId");

  // Get the currently active suggestion ID (if any)
  const activeSuggestionId = usePluginOption(
    { key: KEYS.suggestion },
    "activeId",
  );

  // Floating menu positioning logic
  const floatingOptions: UseVirtualFloatingOptions = useMemo(() => {
    return {
      middleware: [
        offset(8), // Add spacing between the menu and the reference element
        flip({
          // Try fallback placements if the default one doesn't fit
          fallbackPlacements: ["bottom-end", "top-start", "top-end"],
          padding: 12, // Keep some distance from viewport edges
        }),
      ],
      // Show the menu above if a comment/suggestion is active, otherwise below
      placement:
        activeSuggestionId || activeCommentId ? "top-start" : "bottom-start",
    };
  }, [activeSuggestionId, activeCommentId]);

  // State for inserting a new link
  const insertState = useFloatingLinkInsertState({
    ...state,
    floatingOptions: {
      ...floatingOptions,
      ...state?.floatingOptions, // Allow external overrides
    },
  });

  // Insert link menu props/hooks
  const {
    hidden, // Whether the menu should be hidden
    props: insertProps, // Props for the floating container
    ref: insertRef, // Ref for positioning
    textInputProps, // Props for the input element
  } = useFloatingLinkInsert(insertState);

  // State for editing an existing link
  const editState = useFloatingLinkEditState({
    ...state,
    floatingOptions: {
      ...floatingOptions,
      ...state?.floatingOptions,
    },
  });

  // Edit link menu props/hooks
  const {
    editButtonProps, // Props for the "edit" button
    props: editProps, // Props for the floating container
    ref: editRef, // Ref for positioning
    unlinkButtonProps, // Props for the "unlink" button
  } = useFloatingLinkEdit(editState);

  // Form input behavior (prevent submitting on Enter)
  const inputProps = useFormInputProps({
    preventDefaultOnEnterKeydown: true,
  });

  // Do not render anything if hidden
  if (hidden) return null;

  return (
    <>
      {/* Insert link floating menu */}
      <div
        ref={insertRef}
        {...insertProps}
        className="absolute z-50 bg-white border rounded shadow p-2"
      >
        <FloatingLinkUrlInput
          {...textInputProps}
          {...inputProps}
          className="border px-2 py-1 rounded text-sm"
        />
      </div>

      {/* Edit link floating menu */}
      <div
        ref={editRef}
        {...editProps}
        className="absolute z-50 bg-white border rounded shadow p-2 flex gap-2"
      >
        <button
          {...editButtonProps}
          className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
        >
          Edit
        </button>
        <button
          {...unlinkButtonProps}
          className="px-2 py-1 text-sm bg-red-500 text-white rounded"
        >
          Unlink
        </button>
      </div>
    </>
  );
}
