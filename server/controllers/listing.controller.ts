import { Request, Response, NextFunction } from "express";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createListing = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (!req.user || req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (!req.user || req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const limit = parseInt(req.query.limit as string) || 9;
    const startIndex = parseInt(req.query.startIndex as string) || 0;

    let offer: boolean | string | { $in: boolean[] } | undefined = req.query.offer as string | undefined;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished: boolean | string | { $in: boolean[] } | undefined = req.query.furnished as string | undefined;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking: boolean | string | { $in: boolean[] } | undefined = req.query.parking as string | undefined;

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type: string | { $in: string[] } | undefined = req.query.type as string | undefined;

    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = (req.query.searchTerm as string) || "";
    const sort = (req.query.sort as string) || "createdAt";
    const order = (req.query.order as "asc" | "desc") || "desc";

    const queryFilter: Record<string, any> = {
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    };

    const listings = await Listing.find(queryFilter)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      return next(errorHandler(401, "Unauthorized"));
    }
    const listings = await Listing.find({ userRef: req.user.id }).sort({ createdAt: "desc" });
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

