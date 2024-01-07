import { auth } from "@clerk/nextjs";
import { db } from "./db";
import { OrgLimit } from "@prisma/client";
import { MAX_FREE_BOARDS } from "@/constants/boards";

type AvailableOrgLimitFunctions =
  | "INCREMENT"
  | "DECREMENT"
  | "CAN_CREATE"
  | "AVAILABLE_COUNT";

export const manageOrgLimit = async (action: AvailableOrgLimitFunctions) => {
  const { orgId } = auth();
  if (!orgId) {
    return new Error("Unauthorised!");
  }
  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId,
    },
  });
  if (action == "INCREMENT") {
    return await increaseAvailableCount(orgLimit, orgId);
  } else if (action === "DECREMENT") {
    return await decreaseAvailableCount(orgLimit, orgId);
  } else if (action === "AVAILABLE_COUNT") {
    return await getAvailableCount(orgLimit);
  } else if (action === "CAN_CREATE") {
    return await hasAvailableCount(orgLimit);
  }
};

const increaseAvailableCount = async (
  orgLimit: OrgLimit | null,
  orgId: string
) => {
  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count + 1 },
    });
  } else {
    await db.orgLimit.create({
      data: { orgId, count: 1 },
    });
  }
};

const decreaseAvailableCount = async (
  orgLimit: OrgLimit | null,
  orgId: string
) => {
  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count > 0 ? orgLimit.count - 1 : 0 },
    });
  } else {
    await db.orgLimit.create({
      data: { orgId, count: 1 },
    });
  }
};

export const hasAvailableCount = async (orgLimit: OrgLimit | null) => {
  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
    return true;
  } else {
    return false;
  }
};

export const getAvailableCount = async (orgLimit: OrgLimit | null) => {
  if (!orgLimit) {
    return 0;
  }

  return orgLimit.count;
};
