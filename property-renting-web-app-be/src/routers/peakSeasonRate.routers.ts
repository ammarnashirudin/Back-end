
import { Router } from "express";
import { 
    updatePeakSeasonRateController,
    deletePeakSeasonRateController,
    createPeakSeasonController,
    deletePeakSeasonByDateController,
    getPeakSeasonController
} from "../controllers/peakSeasonRate.controllers";
import { 
    authMiddleware,
    roleGuard,
    verifiedMiddleware,
} from "../middlewares/auth.middlewares";

const peakSeasonRateRouter = Router();

peakSeasonRateRouter.put("/:id",authMiddleware, verifiedMiddleware, roleGuard(["TENANT"]),updatePeakSeasonRateController);
peakSeasonRateRouter.delete("/:id", authMiddleware, verifiedMiddleware, roleGuard(["TENANT"]),deletePeakSeasonRateController);
peakSeasonRateRouter.post("/", authMiddleware, verifiedMiddleware, roleGuard(["TENANT"]),createPeakSeasonController);
peakSeasonRateRouter.delete("/",authMiddleware, verifiedMiddleware, roleGuard(["TENANT"]),deletePeakSeasonByDateController);
peakSeasonRateRouter.get("/room/:roomId", authMiddleware, verifiedMiddleware, roleGuard(["TENANT"]),getPeakSeasonController);

export default peakSeasonRateRouter;