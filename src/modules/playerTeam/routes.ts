import { Router } from "express";
import { PlayerTeamController } from "./controllers/PlayerTeamController";

const router = Router();
const controller = new PlayerTeamController();

router.post("/", controller.createPlayerTeam.bind(controller));
router.get("/", controller.listPlayerTeam.bind(controller));
router.get("/deleted", controller.findDeletedPlayerTeams.bind(controller));
router.get("/:id", controller.findById.bind(controller));
router.put("/:id", controller.updatePlayerTeam.bind(controller));
router.delete("/:id", controller.deletePlayerTeam.bind(controller));
router.post("/:id/restore", controller.restorePlayerTeam.bind(controller));
router.post("/:id/toggle-status", controller.togglePlayerTeamsStatus.bind(controller));

export default router;