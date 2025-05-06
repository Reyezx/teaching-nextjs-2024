"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { createMarketplace } from "./create-marketplace-action";
import {
  MARKETPLACE_CONDITIONS,
  MARKETPLACE_CATEGORIES,
} from "../../../lib/db-constants";

type FormValues = {
  name: string;
  description: string;
  price: string;
  category: string;
  condition: string;
  photoUrls: string[];
};

export function NewMarketplaceForm() {
  const { register, watch, setValue, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      photoUrls: [],
    },
  });

  const photoUrls = watch("photoUrls");

  const [category, setCategory] = useState<string>("Select Category" ?? "");

  return (
    <form
      className="grid grid-cols-1"
      onSubmit={handleSubmit((data) => {
        createMarketplace(
          data.name,
          data.description,
          parseFloat(data.price),
          data.category,
          data.condition,
          data.photoUrls
        );
      })}
    >
      <input
        className="input input-bordered"
        placeholder="Name"
        {...register("name")}
      />
      <textarea
        {...register("description")}
        className="textarea textarea-bordered"
        placeholder="Description ..."
      ></textarea>
      <input
        className="input input-bordered"
        type="number"
        placeholder="Price"
        {...register("price")}
      />
      <select className="select select-bordered" {...register("category")}>
        <option value="car">Car</option>
        <option value="furniture">Furniture</option>
        <option value="electronics">Electronics</option>
      </select>

      <select className="select select-bordered" {...register("condition")}>
        <option value="new">Brand New</option>
        <option value="likenew">Used - Like New</option>
        <option value="good">Used - Good</option>
        <option value="fair">Used - Fair</option>
      </select>
      <span>Photo urls</span>
      {photoUrls.map((photoUrl, index) => (
        <div key={index}>
          <input
            className="input input-bordered"
            placeholder="Photo url"
            value={photoUrl}
            onChange={(e) => {
              photoUrls[index] = e.target.value;
              setValue("photoUrls", photoUrls);
            }}
          />
          {photoUrl !== "" ? <img src={photoUrl} /> : null}
          <button
            className="btn btn-xs"
            onClick={(e) => {
              e.preventDefault();
              setValue(
                "photoUrls",
                photoUrls.slice(0, index).concat(photoUrls.slice(index + 1))
              );
            }}
          >
            X
          </button>
        </div>
      ))}
      <button
        className="btn btn-xs"
        onClick={(e) => {
          e.preventDefault();
          setValue("photoUrls", photoUrls.concat([""]));
        }}
      >
        Add photo
      </button>
      <input className="btn btn-sm btn-outline" type="submit" value="Create" />
    </form>
  );
}
