from typing import Literal

Quality = Literal[1, 2, 3, 4, 5]
ModuleLevel = Literal[1, 2, 3]
Mk = Literal[1,2,3,4]


def quality_factor(quality: Quality) -> float:
    quality_float = float(quality)
    return 0.0125*(quality_float**4.0) - 0.125*(quality_float**3.0) + 0.4375*(quality_float**2.0) - 0.325*quality_float + 1


def speed_module_factor(level: ModuleLevel, quality: Quality) -> float:
    level_float = float(level)
    return (0.1*(level_float**2.0) - 0.1*level_float + 0.4)*quality_factor(quality)

def crafting_speed()