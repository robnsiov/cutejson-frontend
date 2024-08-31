"use client";

import apis from "@/constants/apis";
import jsonTokenAtom from "@/recoil/json-token-atom";
import Axios from "@/utils/axios";
import { useDidUpdate } from "@mantine/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Heart } from "iconsax-react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import LikesCountQueryProps from "./types";
import { Loader2 } from "lucide-react";

const Likes = () => {
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [db] = useRecoilState(jsonTokenAtom);

  const {
    data: likesCountRes,
    isLoading: likesCountIsLoading,
    refetch: likesCountRefetch,
  } = useQuery({
    queryKey: ["likes-count"],
    queryFn: () =>
      Axios<LikesCountQueryProps>({ url: `${apis.likesCount}?db=${db.token}` }),
    enabled: false,
  });

  const insertLikeMutation = useMutation({
    mutationKey: ["insert-like"],
    mutationFn: () =>
      Axios({ url: apis.insertLike, data: { db: db.token }, method: "POST" }),
  });

  const likesCountData = likesCountRes?.data;

  useEffect(() => {
    if (likesCountRes?.data) {
      setLikesCount(likesCountRes.data.count);
      setIsLiked(likesCountRes.data.like);
    }
  }, [likesCountRes]);

  useEffect(() => {
    if (db.token) likesCountRefetch();
  }, [db]);

  const heartOnClick = () => {
    setIsLiked(!isLiked);
    insertLikeMutation.mutate();
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <>
      <div className="w-full flex justify-end mt-6">
        {likesCountIsLoading && !likesCountData && (
          <div className="w-[60px] flex justify-center items-center mr-4 h-[31px]">
            <Loader2 className="size-4 animate-spin" />
          </div>
        )}
        {likesCountData && (
          <div
            className="flex justify-center items-center py-1 px-2  border border-red-200
        mr-4 group cursor-pointer"
            onClick={heartOnClick}
          >
            <span className="text-red-500 text-xs font-extralight mr-2">
              {likesCount}
            </span>
            <Heart
              size="22"
              color="#fd5959"
              variant={isLiked ? "Bold" : "Linear"}
              className="group-hover:scale-90 transition"
            />
          </div>
        )}
      </div>
    </>
  );
};
export default Likes;
