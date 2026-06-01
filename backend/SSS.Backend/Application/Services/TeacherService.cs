using SSS.Backend.Application.DTOs;
using SSS.Backend.Application.Interfaces;

namespace SSS.Backend.Application.Services;

public class TeacherService : ITeacherService
{
    public Task<IEnumerable<TeacherDTO>> GetTeachers()
    {
        return Task.FromResult<IEnumerable<TeacherDTO>>(new List<TeacherDTO>());
    }
}