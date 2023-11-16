import { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

export type TreeItem = {
  content: string;
  subtree?: TreeItem[];
};
type TreeProps = {
  data: TreeItem[];
};
type SubtreeProps = {
  data: TreeItem;
};

const Subtree = ({ data }: SubtreeProps) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((prev) => {
      return !prev;
    });
  };

  const openIcon = open ? (
    <ChevronUpIcon className="h-6 w-6 text-blue-500" />
  ) : (
    <ChevronDownIcon className="h-6 w-6 text-blue-500" />
  );

  const subtreeContainer =
    data.subtree &&
    data.subtree.map((treeItem) => {
      return <Subtree key={treeItem.content} data={treeItem} />;
    });

  return (
    <div className="ml-4">
      <button
        onClick={toggleOpen}
        className="flex w-full justify-between border-b-2 px-4 py-2 text-left
        hover:bg-blue-100"
      >
        <p>{data.content}</p>
        {data.subtree && openIcon}
      </button>
      {open && subtreeContainer}
    </div>
  );
};

export const Tree = ({ data }: TreeProps) => {
  const content = data.map((treeItem) => {
    return <Subtree key={treeItem.content} data={treeItem} />;
  });

  return <div>{content}</div>;
};
