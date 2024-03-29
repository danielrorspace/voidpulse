import React from "react";
import { FaPlus } from "react-icons/fa6";
import { useProjectBoardContext } from "../../../../providers/ProjectBoardProvider";
import { useUpdateBoard } from "../../utils/useUpdateBoard";

interface AddEmojiButtonProps {}

export const AddRandomEmojiButton: React.FC<AddEmojiButtonProps> = ({}) => {
  const { boardId, projectId } = useProjectBoardContext();
  const { mutateAsync, isPending } = useUpdateBoard();

  return (
    <>
      <button
        disabled={isPending}
        onClick={() => {
          mutateAsync({
            id: boardId,
            projectId,
            data: { randomEmoji: true },
          });
        }}
      >
        <FaPlus
          className="m-auto fill-white/30 group-hover:fill-white h-full w-full"
          style={{ padding: 6 }}
          size={12}
        />
      </button>
    </>
  );
};
